import { env } from '@/env';
import { eventSchema } from '@/utils/getEventById';

export const eventsSchema = eventSchema.array();

export const getAllEvents = async () => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/events`);

	if (!res.ok) {
		throw new Error('Failed to fetch events');
	}

	return eventsSchema.parse(await res.json());
};
