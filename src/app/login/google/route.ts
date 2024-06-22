import { cookies } from 'next/headers';
import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '@/lib/auth/google';

export const createGoogleAuthorizationURL = async () => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	cookies().set('google_oauth_code', codeVerifier, {
		httpOnly: true,
	});

	cookies().set('google_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	const authorizationUrl = await google.createAuthorizationURL(
		state,
		codeVerifier,
		{
			scopes: ['email', 'profile'],
		},
	);

	return {
		success: true,
		data: authorizationUrl,
	};
};

export const GET = async (): Promise<Response> => {
	const url = await createGoogleAuthorizationURL();

	if (!url.success) {
		return new Response(null, {
			status: 500,
		});
	}

	return Response.redirect(url.data);
};
