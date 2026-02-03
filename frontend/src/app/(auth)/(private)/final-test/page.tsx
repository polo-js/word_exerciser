import { Wrapper } from '@/pages-content/final-test/wrapper';
import { serverFetch } from '@/shared/api/server-fetch';
import { headers } from 'next/headers';
import { EXERCISE_TYPE } from '@/const';
import { IQuestionBlock } from '@/pages-content/final-test/types/questions';

export default async function FinalTest() {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const finalTestExercises = await serverFetch<{
		exercises: { expressions: IQuestionBlock[] }[];
	}>(`/exercises?type=${EXERCISE_TYPE.FINAL_TEST}&max=2`, {
		method: 'GET',
		headers: {
			cookie: cookieHeader,
		},
		next: { tags: ['page-final-test'] },
	});

	if (!finalTestExercises.success) {
		throw new Error('Final test not found');
	}

	return (
		<div className="w-full ">
			<Wrapper expressions={finalTestExercises.result.exercises[0].expressions} />
		</div>
	);
}
