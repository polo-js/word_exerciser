import 'server-only';
import { TResponse } from '@/shared/types/api';
import { API_URL } from '@/const';

// СЕРВЕРНЫЙ ФЕТЧ НЕ ОБОРАЧИВАЕМ В try/catch!!
export async function serverFetch<Result>(
	input: string,
	init?: RequestInit
): Promise<TResponse<Result>> {
	try {
		const res = await fetch(API_URL + input, init);
		const json = await res.json();

		return json as TResponse<Result>;
	} catch (e: any) {
		console.error(e.message);
		return {
			success: false,
			result: null,
		};
	}
}
