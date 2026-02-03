import { IExerciseExpressions } from '@/pages-content/exercises/types/exercises';

export type IQuestionBlock = Pick<
	IExerciseExpressions,
	'id' | 'expression' | 'answerOptions' | 'correctAnswerId'
> & {
	index: number;
};

export interface ITestExpression {
	index: number;
	question: string;
	answer: string;
	correctAnswer: string;
	isCorrectAnswer: boolean;
}
