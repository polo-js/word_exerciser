import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isDevelopment } from '../const';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function plainObjectToDTO<T>(dto: ClassConstructor<T>, obj: object): T {
	return plainToInstance(dto, obj, {
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
