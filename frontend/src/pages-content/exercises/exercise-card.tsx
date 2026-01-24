import { IExercise } from '@/pages-content/exercises/types/exercises';
import cn from 'classnames';
import Image from 'next/image';
import { pluralRu } from '@/shared/utils/print';

interface IExerciseBlockProps {
	exercise: IExercise;
	onClick?: (exercise: IExercise) => void;
}

export function ExerciseCard({ exercise, onClick }: IExerciseBlockProps) {
	const onClickHandler = () => {
		onClick?.(exercise);
	};

	const hasProgress = !!exercise.passed;
	return (
		<div
			className={cn(
				'flex flex-col items-center',
				'py-2 px-4',
				'shadow-exercise rounded-md',
				'border-4 border-transparent',
				'cursor-pointer',
				'hover:border-[#A4C5EB]',
				'transition'
			)}
			onClick={onClickHandler}
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
					<div>{` ${exercise.expressions.length} ${pluralRu(exercise.expressions.length, ['термин', 'термина', 'терминов'])}`}</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
