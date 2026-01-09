import { JsonName, serialize } from 'tserialize';

export class UserLoginDto {
	@JsonName('login', (x: string | undefined) => x?.trim())
	login?: string;

	@JsonName('password', (x: string | undefined) => x?.trim())
	password?: string;

	constructor(data: Partial<UserLoginDto>) {
		Object.assign(this, data);
	}

	toServer() {
		return serialize(this);
	}
}
