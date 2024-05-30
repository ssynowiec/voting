import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

const AddEventPage = () => {
	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon" className="h-7 w-7">
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Back</span>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					Add new event
				</h1>
				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<Button variant="outline" size="sm">
						Discard
					</Button>
					<Button size="sm">Save Event</Button>
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
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										type="text"
										className="w-full"
										placeholder="Event/Voting name"
										defaultValue="Example voting event"
									/>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
										className="min-h-32"
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
								<Label htmlFor="question">Question</Label>
								<Textarea
									id="question"
									defaultValue="Do you like this app?"
									className="min-h-16"
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
									<TableRow>
										<TableCell>
											<Label htmlFor="answer-1" className="sr-only">
												Answer
											</Label>
											<Input
												id="answer-1"
												type="text"
												placeholder="First answer"
												defaultValue="YES"
											/>
										</TableCell>
										<TableCell>
											<Button variant="ghost">
												<span className="sr-only">Delete</span>
												<Trash2 className="h-5 w-5 text-center text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Label htmlFor="answer-2" className="sr-only">
												Answer
											</Label>
											<Input
												id="answer-2"
												type="text"
												placeholder="Second answer"
												defaultValue="NO"
											/>
										</TableCell>
										<TableCell>
											<Button variant="ghost">
												<span className="sr-only">Delete</span>
												<Trash2 className="h-5 w-5 text-center text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className="justify-center border-t p-4">
							<Button size="sm" variant="ghost" className="gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								Add Variant
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
									<Label htmlFor="status">Status</Label>
									<Select>
										<SelectTrigger id="status" aria-label="Select status">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="draft">Draft</SelectItem>
											<SelectItem value="published">Active</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex items-center justify-center gap-2 md:hidden">
				<Button variant="outline" size="sm">
					Discard
				</Button>
				<Button size="sm">Save Product</Button>
			</div>
		</div>
	);
};

export default AddEventPage;
