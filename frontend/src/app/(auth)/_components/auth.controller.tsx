'use client';
import { IUser } from '@/shared/types/user';
import { createContext } from 'react';

interface IAuthControllerProps extends React.PropsWithChildren {
	initialUser: IUser;
}

interface IAuthContext {
	user?: IUser;
}

export const AuthContext = createContext<IAuthContext>({
});

export function AuthController({ children, initialUser }: IAuthControllerProps) {
	return (
		<AuthContext.Provider value={{ user: initialUser }}>{children}</AuthContext.Provider>
	);
}
