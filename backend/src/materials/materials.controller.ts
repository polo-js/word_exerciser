import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import type { IRequestWithToken } from '../shared/types';
import { MaterialsInfoDto } from './schemas/materials.dto';
import { MaterialsService } from './materials.service';

@Controller('materials')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class MaterialsController {
	constructor(private readonly materialsService: MaterialsService) {}

	@Get('/')
	async getMaterials(@Req() req: IRequestWithToken): Promise<MaterialsInfoDto> {
		return this.materialsService.getMaterialsInfo(req.userToken.login);
	}
}
