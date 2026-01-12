import { IProgress } from '@/shared/types/progress';
import { IoChevronForwardOutline } from 'react-icons/io5';
import cn from 'classnames';

interface IExerciseProgressProps {
	progress?: IProgress;
	isAvailable?: boolean;
}

export function ExerciseProgress({ progress, isAvailable }: IExerciseProgressProps) {
	const isFinalTest = !progress;
	const name = isFinalTest ? 'Финальный Тест' : progress.name;
	const category = isFinalTest ? 'Финальный тест по пройденным темам' : progress.category;
	const counter = isFinalTest
		? 'Доступно после 80% прогресса'
		: `${progress.passed}/${progress.total} пройдено`;

	return (
		<div
			className={cn([
				'border',
				'border-gray-600',
				'p-5',
				isAvailable && 'cursor-pointer',
			])}
		>
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<div className="text-2xl">{name}</div>
					<div>{category}</div>
				</div>
				<div className={cn(['flex', 'self-stretch', 'items-end', 'gap-2'])}>
					<div>{counter}</div>
					<div className="self-start">
						<IoChevronForwardOutline size={30} fontWeight={300} />
					</div>
				</div>
			</div>
		</div>
	);
}
