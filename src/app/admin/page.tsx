import { Construction } from 'lucide-react';

const AdminPage = () => {
	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
			</div>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<Construction className="h-12 w-12" />
					<h3 className="text-2xl font-bold tracking-tight">Coming soon</h3>
					<p className="text-sm text-muted-foreground">
						Dashboard is under construction.
					</p>
				</div>
			</div>
		</>
	);
};

export default AdminPage;
