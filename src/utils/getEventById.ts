import { env } from '@/env';

export const getEventById = async (id: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${id}`);

	if (!res.ok) {
		return undefined;
	}

	return await res.json();
};
