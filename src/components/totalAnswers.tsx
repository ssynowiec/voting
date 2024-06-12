'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { env } from '@/env';
import { getAnswersByEventId } from '@/utils/getAnswersByEventId';

interface ActiveUsersProps {
	eventId: string;
}

export const TotalAnswers = ({ eventId }: ActiveUsersProps) => {
	const [totalAnswers, setTotalAnswers] = useState(0);

	useEffect(() => {
		const newSocket = io(env.NEXT_PUBLIC_WS_URL);

		newSocket.on('newAnswer', (data) => {
			setTotalAnswers(data);
		});

		const setUp = async () => {
			const answers = await getAnswersByEventId(eventId);

			setTotalAnswers(answers.length);
		};
		setUp();

		return () => {
			newSocket.close();
		};
	}, [eventId]);

	return (
		<Card x-chunk="dashboard-01-chunk-1">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Total answers</CardTitle>
				<Activity className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2 text-2xl font-bold">
					{totalAnswers}
				</div>
			</CardContent>
		</Card>
	);
};
