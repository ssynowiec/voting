import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { validateRequest } from '@/utils/validateRequest';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
	const { user } = await validateRequest();

	if (user) {
		redirect('/admin');
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Sign in</h1>
			<section className="flex flex-col gap-4">
				<Link
					href="http://localhost:4001/login/github"
					className={buttonVariants({
						className: 'bg-[#333] hover:bg-[#333]/85',
					})}
				>
					Sign in with GitHub
				</Link>
				<Link
					href="http://localhost:4001/login/google"
					className={buttonVariants({ variant: 'outline' })}
				>
					Sign in with Google
				</Link>
				<Link
					href="http://localhost:4001/login/facebook"
					className={buttonVariants({
						className: 'bg-[#0771FF] hover:bg-[#0771FF]/85',
					})}
				>
					Sign in with Facebook
				</Link>
				{/*<Link*/}
				{/*	href="/login/linkedin"*/}
				{/*	className={buttonVariants({*/}
				{/*		className: 'bg-[#0077B5] hover:bg-[#0077B5]/85',*/}
				{/*	})}*/}
				{/*>*/}
				{/*	Sign in with Linkedin*/}
				{/*</Link>*/}
			</section>
		</main>
	);
};

export default LoginPage;
