import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
	CirclePlay,
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle,
	Trash2,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { getEventsByAuthorId } from '@/utils/getEventsByAuthorId';

const EventsPage = async () => {
	const { user } = await validateRequest();

	if (!user) {
		redirect('/login');
	}

	const events = await getEventsByAuthorId(user.id);

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
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
						<TabsTrigger value="archived" className="hidden sm:flex">
							Archived
						</TabsTrigger>
					</TabsList>
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-8 gap-1">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size="sm" variant="outline" className="h-8 gap-1">
							<File className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Export
							</span>
						</Button>
						<Link
							href="/admin/events/add"
							className={buttonVariants({ size: 'sm', className: 'h-8 gap-1' })}
						>
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Add Event
							</span>
						</Link>
					</div>
				</div>
				<TabsContent value="all">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardDescription>Manage your events.</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="hidden md:table-cell">
											Answers
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Total votes
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Created at
										</TableHead>
										<TableHead>
											<span className="sr-only">Actions</span>
										</TableHead>
										<TableHead>
											<span className="sr-only">Start</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{events.map((event) => (
										<TableRow key={event.id}>
											<TableCell className="font-medium">
												<Link href={`/admin/events/${event.id}`}>
													{event.name}
												</Link>
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className={
														event.status === 'active' ? 'bg-green-400' : ''
													}
												>
													{event.status}
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												{event.answers.length}
											</TableCell>
											<TableCell className="hidden md:table-cell">0</TableCell>
											<TableCell className="hidden md:table-cell">
												{event.createdAt}
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															aria-haspopup="true"
															size="icon"
															variant="ghost"
														>
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">Toggle menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem className="cursor-pointer gap-1 text-destructive hover:text-destructive">
															<Trash2 className="h-4 w-4 text-destructive hover:text-destructive" />
															<span className="text-destructive hover:text-destructive">
																Delete
															</span>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
											<TableCell>
												{event.status === 'active' &&
													event.progress === 'not-started' && (
														<Link
															className={buttonVariants({ className: 'gap-2' })}
															href={`/admin/events/${event.id}/start`}
														>
															<CirclePlay className="h-5 w-5" />
															Start
														</Link>
													)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing <strong>1-10</strong> of{' '}
								<strong>{events.length}</strong> events
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
};

export default EventsPage;
