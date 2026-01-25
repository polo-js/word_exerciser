import { Allow, IsNumber } from 'class-validator';

export class ExerciseExpressionProgressDto {
	@Allow()
	@IsNumber()
	id: number;
}
