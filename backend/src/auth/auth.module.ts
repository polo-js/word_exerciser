import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				const secret = config.get<string>('SECRET_JWT');
				if (!secret) throw new Error('SECRET_JWT is missing in env');

				return {
					secret,
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [JwtModule],
})
export class AuthModule {}
