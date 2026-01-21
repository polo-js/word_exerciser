import { plainToInstance } from 'class-transformer';
import { isDevelopment } from '../const';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

type Ctor<T> = new () => T;

export function plainObjectToDTO<T, V>(dto: Ctor<T>, obj: V): V extends any[] ? T[] : T {
	return plainToInstance(dto, obj as any, {
		excludeExtraneousValues: true,
	}) as any;
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
