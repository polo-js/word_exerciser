import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Query,
	ParseIntPipe,
	Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
	CreateExerciseDto,
	CreateExercisesExpressionDto,
	CreateUserDto,
} from './dto/create-admin.dto';
import {
	UpdateExerciseDto,
	UpdateExercisesExpressionDto,
	UpdateUserDto,
} from './dto/update-admin.dto';
import { FullFormatExerciseDto, GetUsersResponseDto } from './dto/read-admin.dto';
import { EXERCISES_TYPE } from '../const';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	/**
	 * GET /full-format?type=1
	 * Вернуть все Exercise по типу + внутри expressions + answerOptions
	 * Без exerciseRel и progress
	 */
	@Get('full-format')
	getFullFormat(
		@Query('type', ParseIntPipe) type: EXERCISES_TYPE
	): Promise<FullFormatExerciseDto[]> {
		return this.adminService.getFullFormatByType(type);
	}

	/**
	 * GET /users
	 * Все пользователи без связей и без passwordHash
	 */
	@Get('users')
	getUsers(): Promise<GetUsersResponseDto[]> {
		return this.adminService.getUsers();
	}

	/**
	 * PATCH /users?id=1
	 * Обновление пользователя (если пришёл password — перехэшировать)
	 */
	@Patch('users')
	updateUser(@Query('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
		return this.adminService.updateUser(id, dto);
	}

	/**
	 * POST /users
	 * Создание пользователя (id не придёт, password захэшировать)
	 */
	@Post('users')
	createUser(@Body() dto: CreateUserDto) {
		return this.adminService.createUser(dto);
	}

	/**
	 * PATCH /exercises?id=10
	 * Придёт только name и imgSrc
	 */
	@Patch('exercises')
	updateExercise(@Query('id', ParseIntPipe) id: number, @Body() dto: UpdateExerciseDto) {
		return this.adminService.updateExercise(id, dto);
	}

	/**
	 * POST /exercise
	 * Придёт name, type, imgSrc
	 */
	@Post('exercise')
	createExercise(@Body() dto: CreateExerciseDto) {
		return this.adminService.createExercise(dto);
	}

	@Delete('users')
	deleteUser(@Query('id', ParseIntPipe) id: number) {
		return this.adminService.deleteUser(id);
	}

	@Delete('exercises')
	deleteExercise(@Query('id', ParseIntPipe) id: number) {
		return this.adminService.deleteExercise(id);
	}

	@Post('exercises-expressions')
	createExercisesExpression(@Body() dto: CreateExercisesExpressionDto) {
		return this.adminService.createExercisesExpression(dto);
	}

	@Patch('exercises-expressions')
	updateExercisesExpression(
		@Query('id', ParseIntPipe) id: number,
		@Body() dto: UpdateExercisesExpressionDto
	) {
		return this.adminService.updateExercisesExpression(id, dto);
	}
}
