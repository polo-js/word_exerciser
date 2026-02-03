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
				'group flex flex-col items-center',
				'p-6',
				'bg-white rounded-2xl',
				'ring-1 ring-black/5 shadow-sm',
				'max-w-[360px] w-full',
				'transition-all duration-200',
				isAvailable
					? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:ring-[#A4C5EB]'
					: 'opacity-60 cursor-not-allowed'
			)}
			onClick={isAvailable ? onClickHandler : void 0}
		>
			<Image
				className={cn(
					'w-[140px] h-[140px] object-contain select-none',
					'transition-transform duration-200',
					isAvailable && 'group-hover:scale-105'
				)}
				src={exercise.imgSrc}
				alt="IMG: Exercise"
				width={150}
				height={150}
				priority={false}
			/>

			<div className="mt-2 text-center text-2xl md:text-3xl font-semibold leading-snug text-gray-900">
				{exercise.name}
			</div>

			<div className="mt-auto pt-6">
				{!hasProgress ? (
					<div className="text-gray-500 text-base px-3 py-1 rounded-full bg-gray-100">
						{`${exercise.expressions.length} ${pluralRu(
							exercise.expressions.length,
							progressDeclensions
						)}`}
					</div>
				) : (
					<div className="text-gray-500 text-base px-3 py-1 rounded-full bg-gray-100">
						{exercise.passed} / {exercise.total}
					</div>
				)}
			</div>
		</div>
	);
}
