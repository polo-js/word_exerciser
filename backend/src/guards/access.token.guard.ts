import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly jwt: JwtService) {}

	async canActivate(ctx: ExecutionContext) {
		const req = ctx.switchToHttp().getRequest<Request>();
		const token = (req as any).cookies?.access_token;
		if (!token) throw new UnauthorizedException('No token');

		try {
			(req as any).user = await this.jwt.verifyAsync(token);
			return true;
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
