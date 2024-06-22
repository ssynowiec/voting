import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
	const { user } = await validateRequest();
	console.log('user: ', user);

	if (user) {
		return redirect('/admin');
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Sign in</h1>
			<section className="flex flex-col gap-4">
				<Link
					href="/login/github"
					className={buttonVariants({
						className: 'bg-[#333] hover:bg-[#333]/85',
					})}
				>
					Sign in with GitHub
				</Link>
				<Link
					href="/login/google"
					className={buttonVariants({ variant: 'outline' })}
				>
					Sign in with Google
				</Link>
				<Link
					href="/login/facebook"
					className={buttonVariants({
						className: 'bg-[#1877F2] hover:bg-[#1877F2]/85',
					})}
				>
					Sign in with Facebook
				</Link>
			</section>
		</main>
	);
};

export default LoginPage;
