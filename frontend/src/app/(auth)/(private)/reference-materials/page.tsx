import { serverFetch } from '@/shared/api/server-fetch';
import { headers } from 'next/headers';
import { IMaterialsInfoDto, MaterialsInfo } from '@/pages-content/materials';

export default async function Page() {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const materialsInfo = await serverFetch<IMaterialsInfoDto>('/materials', {
		method: 'GET',
		headers: {
			cookie: cookieHeader,
		},
	});

	if (!materialsInfo.success) {
		return (
			<h1 className="text-3xl min-h-[720px] flex items-center justify-center">
				Не удалось загрузить справочный материал. Попробуй позднее
			</h1>
		);
	}

	return <MaterialsInfo materialsInfo={materialsInfo.result} />;
}
