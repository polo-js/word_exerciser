import { UserLoginDto } from '@/shared/models/user.dto';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { IUser } from '@/shared/types/user';
import { BaseStore } from '@/shared/lib/base.store';
import { serverFetch } from '@/shared/api/server-fetch';

interface IState {
	user: IUser | null;
}

class UserService extends BaseStore<IState> {
	constructor() {
		super({ user: null });
	}

	setUser(user: IUser) {
		this.setState({ user });
	}

	clearUser() {
		this.setState({ user: null });
	}

	async login(
		userForm: { login: string; password: string },
		redirectTo?: string
	): Promise<void> {
		const result = await serverFetch<IUser>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(new UserLoginDto(userForm).toServer()),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (result.success) {
			this.setUser(result.result);
			redirect(redirectTo ?? '/profile');
		} else {
			toast.error(result.error?.message ?? 'Ошибка авторизации');
		}
	}

	async logout() {
		await serverFetch<true>('/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});
		this.clearUser();
	}
}

export const userServiceStore = new UserService();
