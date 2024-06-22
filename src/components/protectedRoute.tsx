import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

interface ProtectedRoute {
	isAllowedToEnter: boolean;
	children: ReactNode;
}

const ProtectedRoute = ({ isAllowedToEnter, children }: ProtectedRoute) => {
	if (!isAllowedToEnter) {
		return notFound();
	}
	
	return <>{children}</>;
};

export default ProtectedRoute;
