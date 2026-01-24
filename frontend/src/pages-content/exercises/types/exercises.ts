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
	answerOptions: IAnswerOptions[];
	answer: IAnswerOptions;
	expression: string;
	example: string;
	translatedExample: string;
	description: string;
}

export interface IAnswerOptions {
	id: number;
	expression: string;
}