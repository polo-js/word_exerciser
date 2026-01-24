import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import { ExerciseQueryDto } from './schema/exercise.query.dto';
import { ExerciseResultDto } from './schema/exercise-result.dto';
import type { IRequestWithToken } from '../shared/types';

@Controller('exercises')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Get('/')
	findAll(
		@Query() query: ExerciseQueryDto,
		@Req() req: IRequestWithToken
	): Promise<ExerciseResultDto> {
		return this.exercisesService.getExercises({
			type: query.type,
			userLogin: req.userToken.login,
		});
	}
}
