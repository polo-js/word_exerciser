import { Allow, IsBoolean, IsNumber } from 'class-validator';

export class MaterialProgressDto {
	@Allow()
	@IsNumber()
	id: number;
}
