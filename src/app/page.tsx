import { Button } from '@/components/ui/button';
import { validateRequest } from '@/utils/validateRequest';

const Home = async () => {
	const { user } = await validateRequest();
	console.log(user);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Next.js Template {user?.username}</h1>
			<p>Start template with tailwind, prettier & eslint</p>
			<Button>Click me</Button>
		</main>
	);
};

export default Home;
