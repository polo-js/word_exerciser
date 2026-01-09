import 'server-only';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/shared/api/server-fetch';
import { headers } from 'next/headers';

interface IAuthOptions {
	redirectTo?: string;
	disableRedirect?: boolean;
}

export async function checkAuth({
	redirectTo,
	disableRedirect,
}: IAuthOptions = {}): Promise<{
	isAuthenticated: boolean;
}> {
	const cookieHeader = (await headers()).get('cookie') ?? '';

	const { result } = await serverFetch<true>('/auth/me', {
		headers: {
			cookie: cookieHeader,
		},
		cache: 'no-store',
		method: 'GET',
	});

	if (!result && !disableRedirect) {
		redirect(redirectTo ?? '/login');
	}

	return {
		isAuthenticated: !!result,
	};
}
