import { AddNewEventForm } from '@/components/addNewEventForm';

import { redirect } from 'next/navigation';
import { validateRequest } from '@/utils/validateRequest';

const AddEventPage = async () => {
	const { user } = await validateRequest();

	if (!user) {
		redirect('/login');
	}

	return <AddNewEventForm authorId={user.id} />;
};

export default AddEventPage;
