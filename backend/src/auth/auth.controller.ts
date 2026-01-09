import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './schema/login.dto';
import { isDevelopment } from '../const';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('test')
	async test(@Query('password') password: string) {
		return await this.authService.hashPassword(password);
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken } = await this.authService.login(dto.login, dto.password);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			secure: !isDevelopment,
			sameSite: 'lax',
			path: '/',
			maxAge: 15 * 60 * 1000, // 15 минут
		});

		return true;
	}

	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token', { path: '/' });
		return true;
	}

	@Get('me')
	@UseGuards(AccessTokenGuard, RefreshTokenGuard)
	me() {
		console.log('me');
		return true;
	}
}
