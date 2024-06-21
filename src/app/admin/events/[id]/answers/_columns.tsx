'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Answer = {
	id: string;
	event_id: string;
	answers: { answer: string }[];
	updatedAt: string;
	createdAt: string;
};

const deleteAnswer = async (id: string) => {
	console.log('Delete answer with id:', id);
};

export const columns: ColumnDef<Answer>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'answers',
		header: 'Answers',
		cell: ({ row }) => {
			const answers = row.original.answers.map((answer) => answer.answer);

			return answers.join(', ');
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created at" />
		),
	},

	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Updated at" />
		),
		cell: ({ row }) => {
			return new Date(row.original.updatedAt).toLocaleString('pl-PL');
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const answer = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(answer.id)}
						>
							Copy answer ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => deleteAnswer(answer.id)}
							className="text-destructive"
						>
							<Trash2 className="mr-2 h-3.5 w-3.5 text-destructive" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
