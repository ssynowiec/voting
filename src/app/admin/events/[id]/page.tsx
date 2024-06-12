import { notFound } from 'next/navigation';
import { getEventById } from '@/utils/getEventById';
import type { IdParams } from '@/types/idParams';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { CirclePlay } from 'lucide-react';

type EventPageProps = IdParams;

const EventPage = async ({ params: { id } }: EventPageProps) => {
	const event = await getEventById(id);

	if (!event) {
		return notFound();
	}

	return (
		<div className="flex items-center">
			<h1 className="text-lg font-semibold md:text-2xl">{event.name}</h1>
			<div className="ml-auto flex items-center gap-2">
				<Link
					className={buttonVariants({ size: 'sm', className: 'h-8 gap-1' })}
					href={`/admin/events/${event.id}/start`}
				>
					<CirclePlay className="h-4 w-4" />
					Start
				</Link>
			</div>
		</div>
	);
};

export default EventPage;
