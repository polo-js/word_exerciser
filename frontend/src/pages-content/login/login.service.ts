import { UserLoginDto } from '@/shared/models/user.dto';
import { clientFetch } from '@/shared/api/client-fetch';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

class LoginService {
	async login(
		userForm: { login: string; password: string },
		redirectTo?: string
	): Promise<void> {
		const result = await clientFetch<true>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(new UserLoginDto(userForm).toServer()),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (result.success) {
			redirect(redirectTo ?? '/profile');
		} else {
			toast.error(result.error?.message ?? 'Ошибка авторизации');
		}
	}
}

export const loginService = new LoginService();
