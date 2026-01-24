import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './schema/user.dto';
import { User } from '@prisma/client';
import { plainObjectToDTO } from '../shared/utils';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByLogin(login: string) {
		return this.prismaService.user.findUnique({
			where: { login },
		});
	}

	getPlainUser(user: User): UserDto {
		return plainObjectToDTO(UserDto, user);
	}
}
