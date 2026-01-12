import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
	@Expose()
	@IsString()
	login: string;

	@Expose()
	@IsString()
	name: string;

	@Expose()
	@IsString()
	lastname: string;
}
