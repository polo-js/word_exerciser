import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [AuthModule, PrismaModule, UsersModule],
	controllers: [ProgressController],
	providers: [ProgressService],
	exports: [ProgressService],
})
export class ProgressModule {}
