import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [ExercisesController],
	providers: [ExercisesService],
})
export class ExercisesModule {}
