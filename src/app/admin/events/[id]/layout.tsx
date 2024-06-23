import { getEventById } from '@/utils/getEventById';
import type { ReactNode } from 'react';
import type { IdParams } from '@/types/idParams';
import ProtectedRoute from '@/components/protectedRoute';
import { validateRequest } from '@/utils/validateRequest';

interface ProtectAuthoredEventLayoutProps extends IdParams {
	children: ReactNode;
}

const ProtectAndAuthoredRoute = async ({
	children,
	params: { id },
}: ProtectAuthoredEventLayoutProps) => {
	const { user } = await validateRequest();

	const event = await getEventById(id);

	return (
		<ProtectedRoute isAllowedToEnter={event?.authorId === user?.id}>
			{children}
		</ProtectedRoute>
	);
};

export default ProtectAndAuthoredRoute;
