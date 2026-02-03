import { Controller, Get, Header, StreamableFile, UseGuards } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { AccessTokenGuard } from '../guards/access.token.guard';
import { RefreshTokenGuard } from '../guards/refresh.access.guard';

@Controller('excel')
@UseGuards(AccessTokenGuard, RefreshTokenGuard)
export class ExcelController {
	constructor(private readonly excelService: ExcelService) {}

	@Get('users-progress')
	@Header(
		'Content-Type',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	)
	@Header('Content-Disposition', 'attachment; filename="users-progress.xlsx"')
	async downloadUsersProgress() {
		const fileBuffer = await this.excelService.buildUsersProgressXlsx();
		return new StreamableFile(fileBuffer);
	}
}
