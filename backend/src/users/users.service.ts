import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './schemas/user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByLogin(login: string) {
		return this.prismaService.user.findUnique({
			where: { login },
		});
	}

	getPlainUser(user: User): UserDto {
		return plainToInstance(UserDto, user);
	}
}
