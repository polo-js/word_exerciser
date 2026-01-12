import { TResponse } from '@/shared/types/api';
import { API_URL, isDevelopment, isWeb } from '@/const';
import { userServiceStore } from '@/pages-content/login';
import { toast } from 'sonner';

// СЕРВЕРНЫЙ ФЕТЧ НЕ ОБОРАЧИВАЕМ В try/catch!!
export async function serverFetch<Result>(
	input: string,
	init?: RequestInit
): Promise<TResponse<Result>> {
	try {
		const res = await fetch(API_URL + input, init);
		const json = (await res.json()) as TResponse<Result> | TResponse<null>;

		if (!json.success) {
			throw json;
		}

		return json as TResponse<Result>;
		// @ts-ignore
	} catch (e: TResponse<null> | Error) {
		if (isDevelopment || !isWeb) {
			console.log(e.error?.message);
		}

		if (isWeb) {
			if (e instanceof Error) {
				console.error(e);
				toast.error('Что-то пошло не так!');
			}

			if (e.code === 401) {
				void userServiceStore.logout();
			}
		}

		return {
			success: false,
			result: null,
		};
	}
}
