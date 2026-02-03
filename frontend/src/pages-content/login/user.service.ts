import { UserLoginDto } from '@/shared/models/user.dto';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { IUser } from '@/shared/types/user';
import { BaseStore } from '@/shared/lib/base.store';
import { serverFetch } from '@/shared/api/server-fetch';

class UserService extends BaseStore<object> {
	constructor() {
		super({});
	}

	async login(
		userForm: { login: string; password: string },
		redirectTo?: string
	): Promise<void> {
		const result = await serverFetch<IUser>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(new UserLoginDto(userForm).toServer()),
			credentials: 'include',
			disableRedirectToLogin: true,
		});

		if (result.success) {
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
	}
}

export const userServiceStore = new UserService();
