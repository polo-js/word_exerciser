import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IAuthOptions {
	redirectTo?: string;
}

export async function withAuth(options: IAuthOptions = {}) {
	const password = (await cookies()).get('X-Encoded');

	if (!password) {
		redirect(options?.redirectTo ?? '/login');
	}

	return {
		isAuthenticated: true,
	};
}
