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
