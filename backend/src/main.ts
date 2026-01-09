import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import {
	HttpExceptionFilter,
	TransformResultInterceptor,
} from './shared/global.handlers';

const corsOptions = {
	origin: [/localhost:\d{4}$/],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	maxAge: 600,
};

const whitelistPipe = new ValidationPipe({
	transform: true,
	whitelist: true,
	forbidNonWhitelisted: true,
});

async function bootstrap() {
	try {
		const PORT = process.env.PORT;
		const app = await NestFactory.create(AppModule);

		app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);

		app.enableCors({
			...corsOptions,
		});

		app.use(cookieParser());

		app.useGlobalFilters(new HttpExceptionFilter());
		app.useGlobalInterceptors(new TransformResultInterceptor());
		app.useGlobalPipes(whitelistPipe);

		await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
}

void bootstrap();
