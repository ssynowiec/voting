'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
	deleteFn: any;
}

export const DeleteButton = ({ deleteFn }: DeleteButtonProps) => {
	const onClick = async () => {
		await deleteFn();
	};

	return (
		<Button
			onClick={onClick}
			variant="destructive"
			size="sm"
			className="group w-full"
		>
			<Trash2 className="h-4 w-4" />
			<span className="">Delete</span>
		</Button>
	);
};
