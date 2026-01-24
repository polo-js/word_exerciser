'use client';
import { IExercise } from './types/exercises';
import { useState } from 'react';
import { ExerciseInfo } from '@/pages-content/exercises/exercise-info';
import { ExpressionsCard } from '@/pages-content/exercises/expressions-card';

export interface IExercisesMainProps {
	exercises: IExercise[];
}

export function ExercisesMain({ exercises }: IExercisesMainProps) {
	const [chosenExercise, setChosenExercise] = useState<IExercise | null>(null);

	const onExerciseCardClick = (exercise: IExercise) => {
		setChosenExercise(exercise);
	};

	const onBackToCategoryClickHandler = () => {
		setChosenExercise(null);
	};

	return chosenExercise ? (
		<ExpressionsCard
			expression={chosenExercise.expressions}
			selectedExercise={chosenExercise.name}
			onBackToCategoryClick={onBackToCategoryClickHandler}
		/>
	) : (
		<ExerciseInfo exercises={exercises} onExerciseCardClick={onExerciseCardClick} />
	);
}
