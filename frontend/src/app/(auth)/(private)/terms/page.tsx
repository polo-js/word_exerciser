import { serverFetch } from '@/shared/api/server-fetch';
import { IExercise } from '@/pages-content/exercises/types/exercises';
import { ExercisesMain } from '@/pages-content/exercises/exercises-main';
import { headers } from 'next/headers';

export default async function Page() {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const exercises = await serverFetch<{ exercises: IExercise[] }>('/exercises?type=1', {
		method: 'GET',
		headers: {
			cookie: cookieHeader,
		},
	});

	if (!exercises.success) {
		throw new Error('Exercises not found');
	}

	return <ExercisesMain exercises={exercises.result?.exercises} />;
}
