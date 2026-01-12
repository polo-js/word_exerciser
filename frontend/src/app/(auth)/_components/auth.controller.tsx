'use client';
import { IUser } from '@/shared/types/user';
import { useLayoutEffect } from 'react';
import { userServiceStore } from '@/pages-content/login';

interface IAuthControllerProps extends React.PropsWithChildren {
	initialUser?: IUser;
}

export function AuthController({ children, initialUser }: IAuthControllerProps) {
	useLayoutEffect(() => {
		if (initialUser) {
			userServiceStore.setUser(initialUser);
		} else {
			userServiceStore.clearUser();
		}
	}, [initialUser]);

	return <>{children}</>;
}
