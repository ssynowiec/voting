'use client';

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const FormSchema = z.object({
	code: z.string().min(6, 'Code must be 6 characters long'),
});

export const OTPForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			code: '',
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		console.log(data);
	});

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className="flex w-2/3 flex-col items-center justify-center gap-4"
			>
				<Controller
					name="code"
					control={form.control}
					render={({ field }) => (
						<FormItem className="flex flex-col items-center justify-center">
							<FormLabel>Enter the code</FormLabel>
							<FormControl>
								<InputOTP
									maxLength={6}
									{...field}
									pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>Please enter the event code.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};