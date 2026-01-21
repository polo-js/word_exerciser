import { TResponse } from '@/shared/types/api';
import { API_URL, isDevelopment, isWeb } from '@/const';
import { userServiceStore } from '@/pages-content/login';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

interface IRequest extends RequestInit {
	disableRedirectToLogin?: boolean;
}

// СЕРВЕРНЫЙ ФЕТЧ НЕ ОБОРАЧИВАЕМ В try/catch!!
export async function serverFetch<Result>(
	input: string,
	init?: IRequest
): Promise<TResponse<Result>> {
	try {
		const res = await fetch(API_URL + input, {
			...init,
			headers: {
				...init?.headers,
				'Content-Type':
					(init?.headers as Record<string, string> | undefined)?.['Content-Type'] ??
					'application/json',
			},
		});
		const json = (await res.json()) as TResponse<Result> | TResponse<null>;

		if (!json.success) {
			throw json;
		}

		return json as TResponse<Result>;
		// @ts-ignore
	} catch (e: any) {
		if (isDevelopment || !isWeb) {
			console.error(e.error ? (e.error.message ? e.error.message : e.error) : e);
		}

		if (isWeb) {
			if (e instanceof Error) {
				console.error(e);
				toast.error('Что-то пошло не так!');
			}

			if (e.code === 401) {
				void userServiceStore.logout();

				if (!init?.disableRedirectToLogin) {
					redirect('/login');
				}
			}
		}

		return e instanceof Error
			? {
					success: false,
					result: null,
				}
			: {
					success: false,
					result: null,
					code: e.code,
				};
	}
}
