import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EXERCISES_TYPE } from '../exercises/const';
import * as ExcelJS from 'exceljs';

type UserRow = {
	id: number;
	login: string;
	name: string;
	lastname: string | null;
};

@Injectable()
export class ExcelService {
	constructor(private readonly prisma: PrismaService) {}

	async buildUsersProgressXlsx(): Promise<Buffer> {
		// 1) Тоталы (всего)
		const [termsTotal, phrasesTotal, materialsTotal] = await Promise.all([
			this.prisma.exercisesExpression.count({
				where: { exerciseRel: { type: EXERCISES_TYPE.TERMS } },
			}),
			this.prisma.exercisesExpression.count({
				where: { exerciseRel: { type: EXERCISES_TYPE.PHRASES } },
			}),
			this.prisma.referenceMaterial.count(),
		]);

		// 2) Пользователи
		const users: UserRow[] = await this.prisma.user.findMany({
			select: { id: true, login: true, name: true, lastname: true },
			orderBy: { id: 'asc' },
		});

		// 3) ВЕСЬ прогресс по выражениям одним запросом (дальше считаем в памяти)
		const exprProgress = await this.prisma.exerciseExpressionProgress.findMany({
			select: {
				user: true,
				exercisesExpressionRel: {
					select: {
						exerciseRel: {
							select: { type: true },
						},
					},
				},
			},
		});

		// 4) ВЕСЬ прогресс по материалам одним запросом
		const materialsProgress = await this.prisma.referenceMaterialProgress.findMany({
			select: { user: true },
		});

		// 5) Подсчёт passed по пользователям
		const termsPassed = new Map<number, number>();
		const phrasesPassed = new Map<number, number>();
		const materialsPassed = new Map<number, number>();

		for (const row of exprProgress) {
			const t = row.exercisesExpressionRel.exerciseRel.type;
			if (t === EXERCISES_TYPE.TERMS) {
				termsPassed.set(row.user, (termsPassed.get(row.user) ?? 0) + 1);
			}
			if (t === EXERCISES_TYPE.PHRASES) {
				phrasesPassed.set(row.user, (phrasesPassed.get(row.user) ?? 0) + 1);
			}
		}

		for (const row of materialsProgress) {
			materialsPassed.set(row.user, (materialsPassed.get(row.user) ?? 0) + 1);
		}

		// 6) Генерация Excel
		const wb = new ExcelJS.Workbook();
		wb.creator = 'NestJS';
		wb.created = new Date();

		const ws = wb.addWorksheet('Users progress');

		ws.columns = [
			{ header: 'User ID', key: 'id', width: 10 },
			{ header: 'Login', key: 'login', width: 22 },
			{ header: 'Name', key: 'name', width: 18 },
			{ header: 'Lastname', key: 'lastname', width: 18 },
			{ header: 'Термины (прошёл/всего)', key: 'terms', width: 22 },
			{ header: 'Фразы (прошёл/всего)', key: 'phrases', width: 22 },
			{ header: 'Справочник (прошёл/всего)', key: 'materials', width: 26 },
		];

		// заголовок
		ws.getRow(1).font = { bold: true };
		ws.views = [{ state: 'frozen', ySplit: 1 }];
		ws.autoFilter = {
			from: { row: 1, column: 1 },
			to: { row: 1, column: ws.columns.length },
		};

		for (const u of users) {
			const tPassed = termsPassed.get(u.id) ?? 0;
			const pPassed = phrasesPassed.get(u.id) ?? 0;
			const mPassed = materialsPassed.get(u.id) ?? 0;

			ws.addRow({
				id: u.id,
				login: u.login,
				name: u.name,
				lastname: u.lastname ?? '',
				terms: `${tPassed}/${termsTotal}`,
				phrases: `${pPassed}/${phrasesTotal}`,
				materials: `${mPassed}/${materialsTotal}`,
			});
		}

		// чуть аккуратности по таблице
		ws.eachRow((row, rowNumber) => {
			row.alignment = { vertical: 'middle' };
			if (rowNumber > 1) row.height = 18;
		});

		const buffer = await wb.xlsx.writeBuffer();
		return Buffer.from(buffer);
	}
}
