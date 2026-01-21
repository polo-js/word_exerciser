import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import { AccessTokenGuard } from '../guards/access.token.guard';
import type { IRequestWithToken } from '../shared/types';
import { ProfileProgressDto } from './schemas/profile-progress.dto';
import { MaterialProgressDto } from './schemas/materials.dto';

@Controller('progress')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Get('profile-progress')
	async profileProgress(@Req() req: IRequestWithToken): Promise<ProfileProgressDto> {
		return this.progressService.getProfileProgress(req.userToken.login);
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
