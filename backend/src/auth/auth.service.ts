import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // твой доступ к БД

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async login(login: string, password: string) {
		const user = await this.usersService.findByLogin(login);
		if (!user) throw new UnauthorizedException('Логин или пароль введены неверно!');

		const isPasswordValid = await argon2.verify(user.passwordHash, password);
		if (!isPasswordValid)
			throw new UnauthorizedException('Логин или пароль введены неверно!');

		const accessToken = await this.jwtService.signAsync(
			{ sub: user.id, login: user.login },
			{ expiresIn: '1000m' }
		);

		return { accessToken, user: this.usersService.getPlainUser(user) };
	}

	hashPassword(password: string) {
		return argon2.hash(password);
	}
}
