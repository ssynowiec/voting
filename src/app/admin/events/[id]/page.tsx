import { env } from '@/env';
import { notFound } from 'next/navigation';

const getEvent = async (id: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${id}`);

	if (!res.ok) {
		return undefined;
	}

	return await res.json();
};

interface EventPageProps {
	params: {
		id: string;
	};
}

const EventPage = async ({ params: { id } }: EventPageProps) => {
	const event = await getEvent(id);

	if (!event) {
		return notFound();
	}

	return (
		<div className="flex items-center">
			<h1 className="text-lg font-semibold md:text-2xl">{event.name}</h1>
		</div>
	);
};

export default EventPage;
