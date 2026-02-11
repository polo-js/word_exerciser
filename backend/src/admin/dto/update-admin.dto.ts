import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string;

	@IsOptional()
	@IsString()
	lastname?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	login?: string;

	// если пришёл — перехэшируем и кладём в passwordHash
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	password?: string;
}

export class UpdateExerciseDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	imgSrc!: string;
}

export class UpdateExercisesExpressionDto {

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	expression?: string;

	@IsOptional()
	@IsString()
	example?: string;

	@IsOptional()
	@IsString()
	translatedExample?: string;

	// exercise НЕ приходит при изменении по твоему ТЗ

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(3)
	correctAnswerIndex?: number;

	@IsOptional()
	@IsArray()
	@ArrayMinSize(4)
	@ArrayMaxSize(4)
	@IsString({ each: true })
	answerOptions?: [string, string, string, string];
}
