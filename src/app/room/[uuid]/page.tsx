import { env } from '@/env';
import { AnswersForm } from '@/components/answersForm';
import { notFound } from 'next/navigation';
import { getEventById } from '@/utils/getEventById';

interface RoomParams {
	params: {
		uuid: string;
	};
}

const getUser = async (uuid: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user/${uuid}`);

	if (!res.ok) {
		// TODO: Add 404 Error
		throw new Error('User not found');
	}

	return await res.json();
};

const RoomPage = async ({ params: { uuid } }: RoomParams) => {
	const user = await getUser(uuid);
	console.log(user);
	const event = await getEventById(user.event_id);

	if (!event) {
		return notFound();
	}

	console.log(event);

	if (user.progress === 'completed') {
		return (
			<>
				<main className="flex min-h-screen flex-col items-center justify-center p-24">
					<section className="flex flex-col items-center justify-center gap-4">
						<h1 className="text-3xl font-bold">
							You cannot vote in this event
						</h1>
						<p className="text-lg">
							You have already voted in this event. Please wait for the results.
						</p>
					</section>
				</main>
			</>
		);
	}

	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-center p-24">
				<section className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-3xl font-bold">{event.name}</h1>
					<AnswersForm event={event} user={user} />
				</section>
			</main>
		</>
	);
};

export default RoomPage;
