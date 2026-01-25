'use client';
import { IExercise } from './types/exercises';
import { useState } from 'react';
import { ExerciseInfo } from '@/pages-content/exercises/exercise-info';
import { ExpressionsCard } from '@/pages-content/exercises/expressions-card';
import { updateData } from '@/shared/utils/server-utils';
import { EXERCISE_TYPE } from '@/const';

export interface IExercisesMainProps {
	exercises: IExercise[];
	type: EXERCISE_TYPE;
}

export function ExercisesMain({ exercises, type }: IExercisesMainProps) {
	const [chosenExercise, setChosenExercise] = useState<IExercise | null>(null);

	const onExerciseCardClick = (exercise: IExercise) => {
		setChosenExercise(exercise);
	};

	const onBackToCategoryClickHandler = () => {
		setChosenExercise(null);
		void updateData(type === EXERCISE_TYPE.TERMS ? 'page-terms' : 'page-phrases');
	};

	return chosenExercise ? (
		<ExpressionsCard
			expressions={chosenExercise.expressions}
			selectedExercise={chosenExercise.name}
			onBackToCategoryClick={onBackToCategoryClickHandler}
			type={type}
		/>
	) : (
		<ExerciseInfo
			exercises={exercises}
			onExerciseCardClick={onExerciseCardClick}
			type={type}
		/>
	);
}
