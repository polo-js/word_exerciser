import { Profile } from '@/pages-content/profile';
import { serverFetch } from '@/shared/api/server-fetch';
import { IProfileProgress } from '@/pages-content/profile/types/progress';
import { headers } from 'next/headers';

export default async function Page() {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const progressResult = await serverFetch<IProfileProgress>(
		'/progress/profile-progress',
		{
			method: 'GET',
			headers: {
				cookie: cookieHeader,
			},
		}
	);

	if (!progressResult.success) {
		throw new Error();
	}

	return <Profile progress={progressResult.result} />;
}
