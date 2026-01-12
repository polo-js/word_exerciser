'use client';
import { useService } from '@/shared/hooks/store';
import { userServiceStore } from '@/pages-content/login';
import { Profile } from '@/pages-content/profile';

export default function Page() {
	const { user } = useService(userServiceStore);

	if (!user) {
		return null;
	}

	return <Profile user={user} totalProgress={30} />;
}
