import { EXERCISES_TYPE } from '../../const';

export type FullFormatExerciseDto = {
	id: number;
	name: string;
	type: EXERCISES_TYPE;
	imgSrc: string;
	expressions: FullFormatExpressionDto[];
};

export type FullFormatExpressionDto = {
	id: number;
	expression: string;
	example: string | null;
	translatedExample: string | null;
	correctAnswerId: number;
	answerOptions: FullFormatAnswerOptionDto[];
};

export type FullFormatAnswerOptionDto = {
	id: number;
	expression: string;
};

// ===== GET /users =====
export type GetUsersResponseDto = {
	id: number;
	name: string;
	lastname: string | null;
	login: string;
};