import {
	ArgumentsHost,
	BadRequestException,
	CallHandler,
	Catch,
	ExceptionFilter,
	ExecutionContext,
	HttpException,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class TransformResultInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const req = context.switchToHttp().getRequest();
		console.log(new Date().toLocaleTimeString(), req.method, req.url);

		return next.handle().pipe(
			map((result) => {
				return { success: true, result };
			}),
			catchError((error) => {
				return throwError(() => error);
			})
		);
	}
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus?.() ?? 500;
		const timestamp = new Date().toISOString();

		// Подробный лог только на сервере
		console.error(
			`[${timestamp}] HttpException: ${exception.name} (${status})`,
			exception.message,
			process.env.NODE_ENV !== 'production' ? exception.stack : undefined
		);

		// Обработка ошибок валидации
		let userMessage: string | undefined;

		if (exception instanceof BadRequestException) {
			const res = exception.getResponse() as any;
			const messages =
				res?.message || res?.error?.message || res?.error || exception.message;

			if (Array.isArray(messages)) {
				userMessage = messages.join('\n');
			} else if (typeof messages === 'string') {
				userMessage = messages;
			}
		}

		// Безопасное сообщение для клиента
		const safeMessage =
			status === 500
				? 'Internal server error. Please try again later.'
				: userMessage || exception.message || 'Unexpected error';

		response.status(status).json({
			success: false,
			error: {
				message: safeMessage,
			},
			timestamp,
			code: status,
		});
	}
}
