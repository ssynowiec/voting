import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { env } from '@/env';
import { lucia } from '@/lib/auth/auth';
import { generateIdFromEntropySize } from 'lucia';
import { facebook } from '@/lib/auth/facebook';

const getUser = async (googleId: string): Promise<FacebookUser | null> => {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/admins/facebook/${googleId}`,
	);

	if (!res.ok && res.status === 404) {
		return null;
	}

	return await res.json();
};

const createNewUser = async (facebookUser: {
	id: string;
	email: string;
	facebook_id: string;
	username: string;
	avatar_url: string;
}): Promise<void> => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/admins`, {
		method: 'POST',
		body: JSON.stringify(facebookUser),
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
		const tokens = await facebook.validateAuthorizationCode(code);

		const facebookUserResponse = await fetch(
			`https://graph.facebook.com/me?access_token=${tokens.accessToken}&fields=id,name,email,picture`,
		);

		const facebookUser: FacebookUser = await facebookUserResponse.json();
		console.log('googleUser', facebookUser);

		const existingUser = await getUser(facebookUser.id);

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
			email: facebookUser.email,
			facebook_id: facebookUser.id,
			username: facebookUser.email,
			avatar_url: facebookUser.picture.data.url,
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

interface FacebookUser {
	id: string;
	email: string;
	picture: {
		data: {
			url: string;
		};
	};
}
