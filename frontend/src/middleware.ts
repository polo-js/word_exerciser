import { NextRequest, NextResponse } from 'next/server';
import { serverFetch } from '@/shared/api/server-fetch';
import { IUser } from '@/shared/types/user';

// Защищаем только определенные сегменты
export const config = {
	matcher: ['/terms/:path*', '/profile/:path*', '/exercises/:path*', '/login/:path*'],
};

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Пропускаем публичные маршруты
	const isLogin = pathname.startsWith('/login');

	try {
		// Делаем запрос к API для проверки авторизации
		const response = await serverFetch<IUser>('/auth/me', {
			headers: {
				cookie: request.headers.get('cookie') || '',
			},
			disableRedirectToLogin: true,
		});

		if (isLogin && response.success) {
			return NextResponse.redirect(new URL('/profile', request.nextUrl));
		}

		// Если 401 - перенаправляем на /login
		if (!isLogin && !response.success && response.code === 401) {
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}

		// Если успешно - пропускаем запрос
		return NextResponse.next();
	} catch (error) {
		console.error('Auth check failed:', error);
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}
}
