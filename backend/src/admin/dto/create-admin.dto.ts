import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { EXERCISES_TYPE } from '../../const';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsOptional()
	@IsString()
	lastname?: string;

	@IsString()
	@IsNotEmpty()
	login!: string;

	// в запросе пусть приходит обычный пароль
	@IsString()
	@IsNotEmpty()
	password!: string;
}

export class CreateExerciseDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsInt()
	@Min(1)
	type!: EXERCISES_TYPE;

	@IsString()
	@IsNotEmpty()
	imgSrc!: string;
}

export class CreateExercisesExpressionDto {
	@IsString()
	@IsNotEmpty()
	expression!: string;

	@IsOptional()
	@IsString()
	example?: string;

	@IsOptional()
	@IsString()
	translatedExample?: string;

	// только при добавлении
	@IsInt()
	@Min(1)
	exercise!: number;

	@IsInt()
	@Min(0)
	@Max(3)
	correctAnswerIndex!: number;

	@IsArray()
	@ArrayMinSize(4)
	@ArrayMaxSize(4)
	@IsString({ each: true })
	answerOptions!: [string, string, string, string];
}
