import 'server-only';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/shared/api/server-fetch';
import { headers } from 'next/headers';
import { cache } from 'react';
import { IUser } from '@/shared/types/user';

interface ICheckAuth {
	isAuthenticated: boolean;
	user?: IUser;
}

const _checkAuth = cache(async (cookieHeader: string) => {
	const { result: user } = await serverFetch<IUser>('/auth/me', {
		headers: { cookie: cookieHeader },
		cache: 'no-store',
	});

	return user;
});

export async function requireAuth(redirectTo = '/login'): Promise<ICheckAuth> {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const user = await _checkAuth(cookieHeader);

	if (!user) {
		redirect(redirectTo);
	}

	return { isAuthenticated: Boolean(user), user };
}

export async function getAuth(): Promise<ICheckAuth> {
	const cookieHeader = (await headers()).get('cookie') ?? '';
	const user = await _checkAuth(cookieHeader);

	return { isAuthenticated: Boolean(user), user: user || void 0 };
}
