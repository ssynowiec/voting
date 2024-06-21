import { getEventById } from '@/utils/getEventById';
import { notFound } from 'next/navigation';
import { env } from '@/env';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/app/admin/events/[id]/answers/_columns';

interface AnswersPageProps {
	params: {
		id: string;
	};
}

const getAllAnswers = async (id: string) => {
	const allAnswers = await fetch(`${env.NEXT_PUBLIC_API_URL}/answers/${id}`);

	return allAnswers.json();
};

const AnswersPage = async ({ params: { id } }: AnswersPageProps) => {
	const event = await getEventById(id);

	if (!event) {
		return notFound();
	}

	const allAnswers = await getAllAnswers(id);
	console.log(allAnswers);

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">
					{event.name} all answers
				</h1>
				<div className="ml-auto flex items-center gap-2"></div>
			</div>
			<DataTable columns={columns} data={allAnswers} />
		</>
	);
};

export default AnswersPage;
