// Users
export type CreateUserBody = {
	name: string;
	lastname?: string;
	login: string;
	password: string;
};

export type UpdateUserBody = {
	name?: string;
	lastname?: string | null;
	login?: string;
	password?: string;
};

// Exercises
export type CreateExerciseBody = {
	name: string;
	type: number;
	imgSrc: string;
};

export type UpdateExerciseBody = {
	name: string;
	imgSrc: string;
};

export type CreateExercisesExpressionBody = {
	expression: string;
	example?: string | null;
	translatedExample?: string | null;
	exercise: number; // только при создании
	correctAnswerIndex: number;
	answerOptions: string[];
};

export type UpdateExercisesExpressionBody = {
	expression?: string;
	example?: string | null;
	translatedExample?: string | null;
	correctAnswerIndex?: number;
	answerOptions?: string[];
};
