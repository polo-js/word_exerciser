import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import { AccessTokenGuard } from '../guards/access.token.guard';
import type { IRequestWithToken } from '../shared/types';
import { ProfileProgressDto } from './schema/profile-progress.dto';
import { MaterialProgressDto } from './schema/materials.dto';
import { ExerciseExpressionProgressDto } from './schema/exercise.dto';

@Controller('progress')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Get('profile-progress')
	async profileProgress(@Req() req: IRequestWithToken): Promise<ProfileProgressDto> {
		return this.progressService.getProfileProgress(req.userToken.login);
	}

	@Post('add-expression-progress')
	async setExpressionProgress(
		@Req() req: IRequestWithToken,
		@Body() body: ExerciseExpressionProgressDto
	): Promise<boolean> {
		await this.progressService.setExerciseExpressionProgress({
			id: body.id,
			userLogin: req.userToken.login,
		});

		return true;
	}

	@Delete('delete-expression-progress')
	async deleteExpressionProgress(
		@Req() req: IRequestWithToken,
		@Body() body: ExerciseExpressionProgressDto
	): Promise<boolean> {
		await this.progressService.deleteExerciseExpressionProgress({
			id: body.id,
			userLogin: req.userToken.login,
		});

		return true;
	}

	@Post('add-materials-progress')
	async setMaterialProgress(
		@Req() req: IRequestWithToken,
		@Body() body: MaterialProgressDto
	): Promise<boolean> {
		await this.progressService.setMaterialProgress({
			id: body.id,
			userLogin: req.userToken.login,
		});

		return true;
	}

	@Delete('delete-materials-progress')
	async deleteMaterialProgress(
		@Req() req: IRequestWithToken,
		@Body() body: MaterialProgressDto
	): Promise<boolean> {
		await this.progressService.deleteMaterialProgress({
			id: body.id,
			userLogin: req.userToken.login,
		});

		return true;
	}
}
