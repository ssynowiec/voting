import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { env } from '@/env';
import { lucia } from '@/lib/auth/auth';
import { generateIdFromEntropySize } from 'lucia';
import { linkedin } from '@/lib/auth/linkedin';

const getUser = async (linkedinId: string): Promise<{ id: string } | null> => {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/admins/linkedin/${linkedinId}`,
	);

	if (!res.ok && res.status === 404) {
		return null;
	}

	return await res.json();
};

const createNewUser = async (linkedinUser: {
	id: string;
	email: string;
	linkedin_id: string;
	username: string;
	avatar_url: string;
}): Promise<void> => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/admins`, {
		method: 'POST',
		body: JSON.stringify(linkedinUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error('Failed to create user');
	}

	return await res.json();
};

export const GET = async (request: NextRequest): Promise<Response> => {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');

	if (!code) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await linkedin.validateAuthorizationCode(code);

		const linkedinUserResponse = await fetch(
			'https://api.linkedin.com/v2/userinfo',
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);

		const linkedinUser: LinkedinUser = await linkedinUserResponse.json();
		console.log('linkedinUser', linkedinUser);

		const existingUser = await getUser(linkedinUser.sub);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/admin',
				},
			});
		}

		const userId = generateIdFromEntropySize(10);

		await createNewUser({
			id: userId,
			email: linkedinUser.email,
			linkedin_id: linkedinUser.sub,
			username: linkedinUser.email,
			avatar_url: linkedinUser.picture,
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/admin',
			},
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
};

interface LinkedinUser {
	sub: string;
	email: string;
	picture: string;
}
