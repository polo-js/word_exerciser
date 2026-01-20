import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		ProgressModule,
		MaterialsModule,
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
			isGlobal: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
