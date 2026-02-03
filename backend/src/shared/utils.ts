import { plainToInstance } from 'class-transformer';
import { isDevelopment } from '../const';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

type Ctor<T> = new () => T;

export function plainObjectToDTO<T>(dto: Ctor<T>, obj: T) {
	return plainToInstance<T, T>(dto, obj, {
		excludeExtraneousValues: true,
	});
}

type HttpExceptionCtor = new (...args: any[]) => HttpException;

export function handleError(str: string, Exception?: HttpExceptionCtor): never | void {
	if (isDevelopment) {
		if (Exception) {
			throw new Exception(str);
		}
		throw new InternalServerErrorException(str);
	} else {
		console.error(str);
	}
}

export function shuffle<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		// случайный индекс от 0 до i включительно
		const j = Math.floor(Math.random() * (i + 1));
		// swap
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
