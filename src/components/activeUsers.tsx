'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { env } from '@/env';

interface ActiveUsersProps {
	eventCode: string;
}

export const ActiveUsers = ({ eventCode }: ActiveUsersProps) => {
	const [activeUsers, setActiveUsers] = useState(0);

	useEffect(() => {
		const socket = io(env.NEXT_PUBLIC_WS_URL);

		socket.emit('join', eventCode);
		socket.on('join', (data) => {
			setActiveUsers(data);
		});

		const setUp = async () => {
			const res = await fetch(
				`${env.NEXT_PUBLIC_API_URL}/event/${eventCode}/active-users`,
			);

			if (!res.ok) {
				throw new Error('Failed to fetch active users');
			}

			const data = await res.json();
			setActiveUsers(data.activeUsers);
		};
		setUp();

		return () => {
			socket.close();
		};
	}, [eventCode]);

	return (
		<Card x-chunk="dashboard-01-chunk-1">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Active Now</CardTitle>
				<Activity className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2 text-2xl font-bold">
					{activeUsers}
					<Radio
						className={
							activeUsers > 0 ? 'animate-pulse text-green-500' : 'text-primary'
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
