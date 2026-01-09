import { TResponse } from '@/shared/types/api';
import { API_URL } from '@/const';
import { toast } from 'sonner';

// ФЕТЧ НЕ ОБОРАЧИВАЕМ В try/catch!!
export async function clientFetch<Result>(
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
			error: e.message,
			code: e.code,
			timestamp: new Date().toISOString(),
		};
	}
}
