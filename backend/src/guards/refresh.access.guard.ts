import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { isDevelopment } from '../const';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(private readonly jwt: JwtService) {}

	async canActivate(ctx: ExecutionContext) {
		const req = ctx.switchToHttp().getRequest<Request>();
		const res = ctx.switchToHttp().getResponse<Response>();

		const user = (req as any).userToken; // выставил AccessTokenGuard
		if (!user) throw new UnauthorizedException('No user');

		// exp обычно есть в payload после verifyAsync (в секундах)
		const exp: number | undefined = user.exp;
		if (!exp) throw new UnauthorizedException('No exp');

		const now = Math.floor(Date.now() / 1000);
		const remainingSec = exp - now;

		// чтобы не обновлять на каждом запросе — обновляем только если осталось < 5 минут
		if (remainingSec > 5 * 60) return true;

		const newToken = await this.jwt.signAsync(
			{ sub: user.sub, login: user.login },
			{ expiresIn: '15m' }
		);

		res.cookie('access_token', newToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: !isDevelopment, // в dev можешь false
			path: '/',
			maxAge: 15 * 60 * 1000,
		});

		return true;
	}
}
