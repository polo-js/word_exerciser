import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import { AccessTokenGuard } from '../guards/access.token.guard';
import type { IRequestWithToken } from '../shared/types';
import { ProfileProgressDto } from './schemas/profile-progress.dto';

@Controller('progress')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Get('profile-progress')
	async profileProgress(@Req() req: IRequestWithToken): Promise<ProfileProgressDto> {
		return this.progressService.getProfileProgress(req.userToken.login);
	}
}
