import { Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ExerciseResultDto {
	@Expose()
	@ValidateNested({ each: true })
	exercises: ExerciseDto[];
}

export class ExerciseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	imgSrc: string;

	@Expose()
	total: number;

	@Expose()
	passed: number;

	@Expose()
	@ValidateNested({ each: true })
	expressions: ExerciseExpressionsDto[];
}

export class AnswerOptionsDto {
	@Expose()
	id: number;

	@Expose()
	expression: string;
}

export class ExerciseExpressionsDto {
	@Expose()
	id: number;

	@Expose()
	expression: string;

	@Expose()
	answerOptions: AnswerOptionsDto[];

	@Expose()
	correctAnswerId: number;

	@Expose()
	example: string;

	@Expose()
	translatedExample: string;

	@Expose()
	description: string;
}
