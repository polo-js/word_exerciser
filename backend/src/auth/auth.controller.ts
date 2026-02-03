import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './schema/login.dto';
import { isDevelopment } from '../const';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';
import { UsersService } from '../users/users.service';
import type { IRequestWithToken } from '../shared/types';
import { UserDto } from '../users/schema/user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@Get('test')
	async test(@Query('password') password: string) {
		return await this.authService.hashPassword(password);
	}

	@Post('login')
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response
	): Promise<UserDto> {
		const { accessToken, user } = await this.authService.login(dto.login, dto.password);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			secure: !isDevelopment,
			sameSite: 'lax',
			path: '/',
			maxAge: 1000 * 60 * 60 * 60 * 24 * 365 * 5, // 15 минут
		});

		return user;
	}

	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response): boolean {
		res.clearCookie('access_token', { path: '/' });
		return true;
	}

	@Get('me')
	@UseGuards(AccessTokenGuard, RefreshTokenGuard)
	async me(@Req() req: IRequestWithToken): Promise<UserDto> {
		const user = await this.usersService.findByLogin(req.userToken.login);
		if (!user) {
			throw new UnauthorizedException('No user!');
		}

		return this.usersService.getPlainUser(user);
	}
}
