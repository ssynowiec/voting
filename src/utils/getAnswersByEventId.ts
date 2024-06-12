import { env } from '@/env';
import { z } from 'zod';

export const answersSchema = z
	.object({
		id: z.string().uuid(),
		event_id: z.string().uuid(),
		answers: z.object({ answer: z.string() }).array(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.array();

export const getAnswersByEventId = async (eventId: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/answers/${eventId}`);

	if (!res.ok) {
		throw new Error('Failed to fetch answers');
	}

	return answersSchema.parse(await res.json());
};
