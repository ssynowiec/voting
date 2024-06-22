import { AddNewEventForm } from '@/components/addNewEventForm';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';

const AddEventPage = async () => {
	const { user } = await validateRequest();

	if (!user) {
		redirect('/login');
	}

	return <AddNewEventForm authorId={user.id} />;
};

export default AddEventPage;
