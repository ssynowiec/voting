'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

const AddNewEventFormSchema = z.object({
	name: z.string(),
	description: z
		.string({ required_error: 'Description is required' })
		.min(10, { message: 'Description is too short' }),
	question: z.string(),
	answers: z.array(z.object({ answer: z.string() })),
	status: z.string(),
});

export const AddNewEventForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof AddNewEventFormSchema>>({
		defaultValues: {
			name: 'Example voting event',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis blandit facilisis.',
			question: 'Do you like this app?',
			answers: [{ answer: 'YES' }, { answer: 'NO' }],
			status: 'draft',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		console.log(data);
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'answers',
		rules: { required: true, minLength: 2 },
	});

	return (
		<Form {...form}>
			<form
				className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
				onSubmit={onSubmit}
			>
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="icon"
						className="h-7 w-7"
						type="button"
						onClick={() => {
							router.push('/admin/events');
						}}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Button>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Add new event
					</h1>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">Discard</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>
										Are you sure to discard changes in creating new voting?
									</DialogDescription>
								</DialogHeader>
								<DialogFooter className="sm:justify-start">
									<DialogClose asChild>
										<Button type="button" variant="outline">
											No
										</Button>
									</DialogClose>
									<Button
										type="button"
										onClick={() => {
											router.push('/admin/events');
										}}
									>
										Yes
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<Button size="sm" type="submit">
							Save Event
						</Button>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card x-chunk="dashboard-07-chunk-0">
							<CardHeader>
								<CardTitle>Event Details</CardTitle>
								<CardDescription>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="name"
											rules={{ required: 'Name is required' }}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Name<span className="ml-1 text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input
															type="text"
															className="w-full"
															placeholder="Event/Voting name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="description"
											rules={{
												required: 'Description is required',
												minLength: {
													message: 'Description is too short',
													value: 10,
												},
											}}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Description
														<span className="ml-1 text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Tell us a little bit about yourself"
															className="resize-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-07-chunk-1">
							<CardHeader>
								<CardTitle>Question</CardTitle>
								<CardDescription>
									Add your question to the voting event
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="question"
										rules={{ required: 'Question is required' }}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Question
													<span className="ml-1 text-destructive">*</span>
												</FormLabel>
												<FormControl>
													<Textarea className="resize-none" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-07-chunk-1">
							<CardHeader>
								<CardTitle>Answers</CardTitle>
								<CardDescription>
									Add your answers to the voting event
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Answer</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{fields.map((field, index) => (
											<TableRow key={field.id}>
												<TableCell>
													<FormField
														control={form.control}
														name={`answers.${index}.answer`}
														rules={{ required: 'Answer is required' }}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		type="text"
																		className="w-full"
																		placeholder="Answer"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</TableCell>
												<TableCell>
													<Button variant="ghost" onClick={() => remove(index)}>
														<span className="sr-only">Delete</span>
														<Trash2 className="h-5 w-5 text-center text-destructive" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
							<CardFooter className="justify-center border-t p-4">
								<Button
									size="sm"
									variant="ghost"
									className="gap-1"
									type="button"
									onClick={() => {
										append({ answer: '' });
									}}
								>
									<PlusCircle className="h-3.5 w-3.5" />
									Add answer
								</Button>
							</CardFooter>
						</Card>
					</div>
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card x-chunk="dashboard-07-chunk-3">
							<CardHeader>
								<CardTitle>Event Status</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="status"
											rules={{ required: 'Status is required' }}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Status
														<span className="ml-1 text-destructive">*</span>
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger
																id="status"
																aria-label="Select status"
															>
																<SelectValue placeholder="Select status" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="draft">Draft</SelectItem>
															<SelectItem value="published">Active</SelectItem>
														</SelectContent>
													</Select>
													<FormDescription>
														Publish now or save as draft
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 md:hidden">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Discard</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										No
									</Button>
								</DialogClose>
								<Button type="button" variant="secondary">
									Yes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Button size="sm" type="submit">
						Save Event
					</Button>
				</div>
			</form>
		</Form>
	);
};
