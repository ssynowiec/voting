import { env } from '@/env';
import { z } from 'zod';

const statusEnum = z.enum(['active', 'draft', 'archived']);
const progressEnum = z.enum(['not-started', 'in-progress', 'completed']);

export const eventSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	question: z.string(),
	answers: z.object({ answer: z.string() }).array(),
	status: statusEnum,
	createdAt: z.string(),
	eventCode: z.string(),
	progress: progressEnum,
	authorId: z.string(),
});

export const getEventById = async (id: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${id}`);

	if (!res.ok) {
		return undefined;
	}

	return eventSchema.parse(await res.json());
};
