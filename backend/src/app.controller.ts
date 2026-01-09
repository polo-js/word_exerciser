import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RefreshTokenGuard } from './guards/refresh.access.guard';
import { AccessTokenGuard } from './guards/access.token.guard';

@Controller()
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
