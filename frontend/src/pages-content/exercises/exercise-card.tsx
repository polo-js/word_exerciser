import { IExercise } from '@/pages-content/exercises/types/exercises';
import cn from 'classnames';
import Image from 'next/image';
import { pluralRu } from '@/shared/utils/print';
import { EXERCISE_TYPE } from '@/const';

interface IExerciseBlockProps {
	exercise: IExercise;
	onClick?: (exercise: IExercise) => void;
	type: EXERCISE_TYPE;
}

export function ExerciseCard({ exercise, onClick, type }: IExerciseBlockProps) {
	const isAvailable = exercise.total !== exercise.passed;
	const onClickHandler = () => {
		onClick?.(exercise);
	};

	const progressDeclensions: [string, string, string] =
		type === EXERCISE_TYPE.TERMS
			? ['термин', 'термина', 'терминов']
			: ['фраза', 'фразы', 'фраз'];

	const hasProgress = !!exercise.passed;
	return (
		<div
			className={cn(
				'flex flex-col items-center',
				'py-2 px-4',
				'shadow-exercise rounded-md',
				'border-4 border-transparent',
				isAvailable && 'cursor-pointer',
				'hover:border-[#A4C5EB]',
				'max-w-[360px] w-full',
				'transition'
			)}
			onClick={isAvailable ? onClickHandler : void 0}
		>
			<Image src={exercise.imgSrc} alt="IMG: Exercise" width={150} height={120} />
			<div className="text-5xl text-center">{exercise.name}</div>
			<div
				className={cn(
					'text-gray-600 text-xl mt-5 mb-5',
					'flex justify-end items-end',
					'h-full'
				)}
			>
				{!hasProgress ? (
					<div>{` ${exercise.expressions.length} ${pluralRu(exercise.expressions.length, progressDeclensions)}`}</div>
				) : (
					<div>
						{exercise.passed} / {exercise.total}
					</div>
				)}
			</div>
		</div>
	);
}
