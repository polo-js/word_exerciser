import { IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ProgressDto } from './progress.dto';

export class ProfileProgressDto {
	@Expose()
	@IsNumber()
	totalProgress: number;

	@Expose()
	@IsNumber()
	finalTestThresholdPercent: number;

	@Expose()
	@IsBoolean()
	finalTestIsAvailable: boolean;

	@Expose()
	@IsArray()
	progressList: ProgressDto[];
}
