import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { UsersModule } from '../users/users.module';
import { ProgressModule } from '../progress/progress.module';

@Module({
	imports: [AuthModule, UsersModule, ProgressModule],
	providers: [MaterialsService],
	controllers: [MaterialsController],
	exports: [],
})
export class MaterialsModule {}
