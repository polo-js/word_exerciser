export interface IExercise {
	id: number;
	name: string;
	imgSrc: string;
	total: number;
	passed: number;
	expressions: IExerciseExpressions[];
}


export interface IExerciseExpressions {
	id: number;
	expression: string;
	answerOptions: IAnswerOptions[];
	correctAnswerId: number;
	example: string;
	translatedExample: string;
	description: string;
}

export interface IAnswerOptions {
	id: number;
	expression: string;
}