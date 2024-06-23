import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
	return cookies().get(name)?.value ?? '';
};

export const validateRequest = async () => {
	const auth_session = await getCookie('auth_session');
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
