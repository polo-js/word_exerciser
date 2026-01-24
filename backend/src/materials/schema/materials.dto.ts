import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class MaterialDto {
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
	hrefToMaterials: string;

	@Expose()
	@IsString()
	imgSrc: string;

	@Expose()
	@IsBoolean()
	marked: boolean;
}
