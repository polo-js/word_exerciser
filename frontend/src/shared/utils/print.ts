import { IUser } from '@/shared/types/user';

export function namePretty(user: Pick<IUser, 'name' | 'lastname'>) {
	const { name, lastname } = user;
	if (lastname) {
		return `${name} ${lastname}`;
	}

	return name || 'User';
}
