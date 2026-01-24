import { Transform, Type } from 'class-transformer';
import { IsIn } from 'class-validator';
import { EXERCISES_TYPE } from '../const';

export class ExerciseQueryDto {
	@Transform(({ value }) => Number(value))
	@IsIn([EXERCISES_TYPE.TERMS, EXERCISES_TYPE.PHRASES], {
		message: 'Exercise query type must be 1 or 2',
	})
	type: EXERCISES_TYPE.TERMS | EXERCISES_TYPE.PHRASES;
}
