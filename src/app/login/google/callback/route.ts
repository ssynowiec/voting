import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { google } from '@/lib/auth/google';
import { env } from '@/env';
import { lucia } from '@/lib/auth/auth';
import { generateIdFromEntropySize } from 'lucia';

const getUser = async (googleId: string): Promise<GoogleUser | null> => {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/admins/google/${googleId}`,
	);

	if (!res.ok && res.status === 404) {
		return null;
	}

	return await res.json();
};

const createNewUser = async (googleUser: {
	id: string;
	email: string;
	google_id: string;
	username: string;
	avatar_url: string;
}): Promise<void> => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/admins`, {
		method: 'POST',
		body: JSON.stringify(googleUser),
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
	const state = url.searchParams.get('state');

	if (!code || !state) {
		return new Response(null, {
			status: 400,
		});
	}

	const codeVerifier = cookies().get('google_oauth_code')?.value ?? null;
	const storedState = cookies().get('google_oauth_state')?.value ?? null;

	if (!codeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);

		const googleUserResponse = await fetch(
			'https://www.googleapis.com/oauth2/v1/userinfo',
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);

		const googleUser: GoogleUser = await googleUserResponse.json();
		console.log('googleUser', googleUser);

		const existingUser = await getUser(googleUser.id);

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
					Location: '/',
				},
			});
		}

		const userId = generateIdFromEntropySize(10);

		await createNewUser({
			id: userId,
			email: googleUser.email,
			google_id: googleUser.id,
			username: googleUser.email,
			avatar_url: googleUser.picture,
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

interface GoogleUser {
	id: string;
	email: string;
	picture: string;
}
