import { cookies } from 'next/headers';
import { generateState } from 'arctic';
import { linkedin } from '@/lib/auth/linkedin';

export const createLinkedinAuthorizationURL = async () => {
	const state = generateState();

	cookies().set('linkedin_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	const authorizationUrl = await linkedin.createAuthorizationURL(state, {
		scopes: ['email', 'profile'],
	});

	return {
		success: true,
		data: authorizationUrl,
	};
};

export const GET = async (): Promise<Response> => {
	const url = await createLinkedinAuthorizationURL();

	if (!url.success) {
		return new Response(null, {
			status: 500,
		});
	}

	return Response.redirect(url.data);
};
