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
		return (
			<h1 className="text-3xl min-h-[720px] flex items-center justify-center">
				Не удалось загрузить профиль. Попробуй позднее
			</h1>
		);
	}

	return <Profile progress={progressResult.result} />;
}
