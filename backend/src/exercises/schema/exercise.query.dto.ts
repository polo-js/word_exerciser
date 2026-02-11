import { Transform, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { EXERCISES_TYPE } from '../../const';

export class ExerciseQueryDto {
	@Transform(({ value }) => Number(value))
	@IsIn([EXERCISES_TYPE.TERMS, EXERCISES_TYPE.PHRASES, EXERCISES_TYPE.FINAL_TEST], {
		message: 'Exercise query type must be 1-3',
	})
	type: EXERCISES_TYPE.TERMS | EXERCISES_TYPE.PHRASES;

	@Transform(({ value }) => Number(value))
	@IsNumber()
	@IsOptional()
	max?: number;
}
