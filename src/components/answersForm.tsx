'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { env } from '@/env';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { type eventSchema } from '@/utils/getEventById';

interface AnswersFormProps {
	event: z.infer<typeof eventSchema>;
	user: {
		id: string;
	};
}

export const AnswersForm = ({ event, user }: AnswersFormProps) => {
	useEffect(() => {
		const socket = io(env.NEXT_PUBLIC_WS_URL);

		socket.emit('join', event.eventCode);

		return () => {
			socket.close();
		};
	}, [event.eventCode]);

	const options: [string, ...string[]] = [''];
	event.answers.forEach((answer) => options.push(answer.answer));

	const FormSchema = z.object({
		answer: z.enum(options, {
			required_error: 'You need to select a answer.',
		}),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const dataToSubmit = {
			answers: [{ answer: data.answer }],
			event_id: event.id,
			user_id: user.id,
		};

		const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/answers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataToSubmit),
		});

		if (!res.ok) {
			form.setError('answer', {
				type: 'manual',
				message: res.statusText,
			});
		}
	});

	return (
		<div className="flex w-full justify-center">
			<Form {...form}>
				<form onSubmit={onSubmit} className="flex w-2/3 flex-col space-y-6">
					<FormField
						control={form.control}
						name="answer"
						render={({ field }) => (
							<FormItem className="w-full space-y-3">
								<FormLabel>{event.question}</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										{event.answers.map((answer) => (
											<FormItem
												className="flex items-center space-x-3 space-y-0"
												key={answer.answer}
											>
												<FormControl>
													<RadioGroupItem value={answer.answer} />
												</FormControl>
												<FormLabel className="font-normal">
													{answer.answer}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit answer</Button>
				</form>
			</Form>
		</div>
	);
};
