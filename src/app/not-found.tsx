import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold tracking-tight">
					404 - Page Not Found
				</h1>
				<Link className={buttonVariants()} href="/">
					Back to homepage
				</Link>
			</section>
		</main>
	);
};

export default NotFound;
