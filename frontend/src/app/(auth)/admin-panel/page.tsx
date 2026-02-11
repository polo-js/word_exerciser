import { AdminBlock } from './_components/admin-panel';
import { serverFetch } from '@/shared/api/server-fetch';
import { EXERCISE_TYPE } from '@/const';
import {
	FullFormatExercise,
	UserListItem,
} from '@/app/(auth)/admin-panel/_components/types/response';

export default async function Page() {
	const [terms, phrases, users] = await Promise.all([
		serverFetch<FullFormatExercise<EXERCISE_TYPE.TERMS>[]>(
			`/admin/full-format?type=${EXERCISE_TYPE.TERMS}`,
			{
				method: 'GET',
				next: {
					tags: ['admin-panel'],
				},
			}
		),
		serverFetch<FullFormatExercise<EXERCISE_TYPE.PHRASES>[]>(
			`/admin/full-format?type=${EXERCISE_TYPE.PHRASES}`,
			{
				method: 'GET',
				next: {
					tags: ['admin-panel'],
				},
			}
		),
		serverFetch<UserListItem[]>(`/admin/users`, {
			method: 'GET',
			next: {
				tags: ['admin-panel'],
			},
		}),
	]);

	if (!terms.success || !phrases.success || !users.success) {
		throw new Error();
	}

	console.log(terms, phrases, users);

	return (
		<AdminBlock terms={terms.result} phrases={phrases.result} users={users.result} />
	);
}
