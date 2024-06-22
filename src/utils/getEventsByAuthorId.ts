import { env } from '@/env';
import { eventsSchema } from '@/utils/getAllEvents';

export const getEventsByAuthorId = async (authorId: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/events/${authorId}`);

	if (!res.ok) {
		throw new Error('Failed to fetch events');
	}

	return eventsSchema.parse(await res.json());
};
