import { EXERCISE_TYPE } from '@/const';

export type FullFormatExercise<T extends EXERCISE_TYPE> = {
	id: number;
	name: string;
	type: T;
	imgSrc: string;
	expressions: FullFormatExpression[];
};

export type FullFormatExpression = {
	id: number;
	expression: string;
	example: string | null;
	translatedExample: string | null;
	correctAnswerId: number;
	answerOptions: FullFormatAnswerOption[];
};

export type FullFormatAnswerOption = {
	id: number;
	expression: string;
};

export type UserListItem = {
	id: number;
	name: string;
	lastname: string | null;
	login: string;
};
