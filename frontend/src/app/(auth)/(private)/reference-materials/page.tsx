import { serverFetch } from '@/shared/api/server-fetch';
import { headers } from 'next/headers';
import { IMaterialDto, MaterialsInfo } from '@/pages-content/materials';

export default async function Page() {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const materialsInfo = await serverFetch<IMaterialDto[]>('/materials', {
		method: 'GET',
		headers: {
			cookie: cookieHeader,
		},
	});


	if (!materialsInfo.success) {
		throw new Error();
	}

	return <MaterialsInfo materialsInfo={materialsInfo.result} />;
}
