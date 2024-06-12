import { env } from '@/env';
import { z } from 'zod';

const statusEnum = z.enum(['active', 'inactive']);
const progressEnum = z.enum(['not-started', 'in-progress', 'completed']);

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
	z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

const eventSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	question: z.string(),
	answers: jsonSchema,
	status: statusEnum,
	createdAt: z.string(),
	eventCode: z.string(),
	progress: progressEnum,
});

export const getEventById = async (id: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${id}`);

	if (!res.ok) {
		return undefined;
	}

	return eventSchema.parse(await res.json());
};
