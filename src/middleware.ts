import { NextRequest, NextResponse } from 'next/server';

export const validateRequest = async (auth_session: string) => {
	const response = await fetch('http://localhost:4001/session/me/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			cookie: `auth_session=${auth_session}`,
		},
	});

	if (!response.ok) {
		return { user: null, session: null };
	}

	return await response.json();
};

export const middleware = async (request: NextRequest) => {
	const auth_session = request.cookies.get('auth_session')?.value ?? '';

	const { user } = await validateRequest(auth_session);

	if (!user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
};

export default middleware;

export const config = {
	matcher: ['/admin/:path*'],
};
