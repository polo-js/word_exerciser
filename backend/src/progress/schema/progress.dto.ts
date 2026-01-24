import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ProgressDto {
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsString()
	title: string;

	@Expose()
	@IsString()
	description: string;

	@Expose()
	@IsString()
	imgSrc: string;

	@Expose()
	@IsString()
	progressText: string;

	@Expose()
	@IsString()
	hrefToMaterials: string;
}
