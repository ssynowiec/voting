import { generateState } from 'arctic';
import { cookies } from 'next/headers';
import { facebook } from '@/lib/auth/facebook';

export const createFacebookAuthorizationURL = async () => {
	const state = generateState();
	// const codeVerifier = generateCodeVerifier();
	//
	// cookies().set('facebook_oauth_code', codeVerifier, {
	// 	httpOnly: true,
	// });

	cookies().set('facebook_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	const authorizationUrl = await facebook.createAuthorizationURL(state, {
		scopes: ['email', 'public_profile'],
	});

	return {
		success: true,
		data: authorizationUrl,
	};
};

export const GET = async (): Promise<Response> => {
	const url = await createFacebookAuthorizationURL();

	if (!url.success) {
		return new Response(null, {
			status: 500,
		});
	}

	return Response.redirect(url.data);
};
