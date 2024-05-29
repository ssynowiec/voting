import { OTPForm } from '@/components/OTPForm';

const JoinPage = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-3xl font-bold">Join</h1>
				<OTPForm />
			</section>
		</main>
	);
};

export default JoinPage;
