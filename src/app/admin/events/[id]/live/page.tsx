import { getEventById } from '@/utils/getEventById';
import { notFound } from 'next/navigation';
import type { IdParams } from '@/types/idParams';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, OctagonPause, Users } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CopyToClipboardButton } from '@/components/copyToClipboard';
import { env } from '@/env';
import { ActiveUsers } from '@/components/activeUsers';
import { TotalAnswers } from '@/components/totalAnswers';
import { getAnswersByEventId } from '@/utils/getAnswersByEventId';

type LiveEventPageProps = IdParams;

const getEventUsers = async (eventId: string) => {
	const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${eventId}`);
	return await response.json();
};

const LiveEventPage = async ({ params: { id } }: LiveEventPageProps) => {
	const event = await getEventById(id);

	if (!event) {
		return notFound();
	}

	console.log(event);
	const answers = await getAnswersByEventId(id).then((data) =>
		data
			.sort(
				(a, b) =>
					new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
			)
			.slice(0, 5),
	);
	console.log(answers);

	const users = await getEventUsers(id);

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">
					{event.name} live results
				</h1>
				<div className="ml-auto flex items-center gap-2">
					<Link
						className={buttonVariants({ size: 'sm', className: 'h-8 gap-1' })}
						href={`/admin/events/${id}/live`}
					>
						<OctagonPause className="h-4 w-4" />
						End event
					</Link>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<TotalAnswers eventId={event.id} />
				<ActiveUsers eventCode={event.eventCode} />
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{users.length}</div>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Event code</CardTitle>
						<CopyToClipboardButton text={event.eventCode} />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{event.eventCode}</div>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Answers</CardTitle>
							<CardDescription>Recent answer from your voting.</CardDescription>
						</div>
						<Button asChild size="sm" className="ml-auto gap-1">
							<Link href={`/admin/events/${event.id}/answers`}>
								View All
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Answer ID</TableHead>
									<TableHead>Date & Time</TableHead>
									<TableHead className="text-right">Answer</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{answers.map((answer) => (
									<TableRow key={answer.id}>
										<TableCell>
											<div className="font-medium">{answer.id}</div>
										</TableCell>
										<TableCell>
											{new Date(answer.updatedAt).toLocaleString('pl-PL')}
										</TableCell>
										<TableCell className="text-right">
											{answer.answers.map((answerValue) => (
												<div key={answerValue.answer}>{answerValue.answer}</div>
											))}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default LiveEventPage;
