import { buttonVariants } from '@/components/ui/button';
import { env } from '@/env';
import Link from 'next/link';

const getEvents = async () => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/events`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return [];
};

const EventsPage = async () => {
	const events = await getEvents();

	if (!events || !events.length) {
		return (
			<>
				<div className="flex items-center">
					<h1 className="text-lg font-semibold md:text-2xl">Events</h1>
				</div>
				<div
					className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
					x-chunk="dashboard-02-chunk-1"
				>
					<div className="flex flex-col items-center gap-1 text-center">
						<h3 className="text-2xl font-bold tracking-tight">
							You have no events
						</h3>
						<p className="text-sm text-muted-foreground">
							You can start voting event.
						</p>
						<Link className={buttonVariants()} href="/admin/events/add">
							Add Event
						</Link>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Events</h1>
			</div>
		</>
	);
};

export default EventsPage;
