import { ProgressLine } from '@/shared/ui/progress';
import cn from 'classnames';
import { ExerciseCard } from '@/pages-content/exercises/exercise-card';
import { IExercisesMainProps } from '@/pages-content/exercises/exercises-main';
import { IExercise } from '@/pages-content/exercises/types/exercises';
import { EXERCISE_TYPE } from '@/const';

interface IExerciseInfoProps extends IExercisesMainProps {
	onExerciseCardClick: (exercise: IExercise) => void;
}

function getProgress(exercises: IExercise[]) {
	const { passed, total } = exercises.reduce(
		(acc, exercise) => {
			return {
				total: acc.total + exercise.total,
				passed: acc.passed + exercise.passed,
			};
		},
		{ total: 0, passed: 0 }
	);

	return total ? (passed / total) * 100 : 0;
}

export function ExerciseInfo({
	exercises,
	onExerciseCardClick,
	type,
}: IExerciseInfoProps) {
	const progress = getProgress(exercises);

	return (
		<div className="flex flex-col w-full">
			<div className="w-full">
				<ProgressLine percent={progress} />
			</div>
			<div className="mt-6 flex flex-col items-center">
				<div className="text-4xl">
					Выберите категорию {type === EXERCISE_TYPE.TERMS ? 'терминов' : 'фраз'}
				</div>
				<div
					className={cn(
						'mt-8',
						'flex justify-center',
						'w-full',
						'gap-6'
					)}
				>
					{exercises.map((exercise) => (
						<ExerciseCard
							key={exercise.id}
							exercise={exercise}
							onClick={onExerciseCardClick}
							type={type}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
