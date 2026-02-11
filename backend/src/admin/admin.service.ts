import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import {
	CreateExerciseDto,
	CreateExercisesExpressionDto,
	CreateUserDto,
} from './dto/create-admin.dto';
import {
	UpdateExerciseDto,
	UpdateExercisesExpressionDto,
	UpdateUserDto,
} from './dto/update-admin.dto';
import { ADMIN_LOGIN, EXERCISES_TYPE } from '../const';

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}

	async getFullFormatByType(type: EXERCISES_TYPE) {
		// Вернём Exercise + expressions + answerOptions
		// Без exerciseRel и progress (просто не выбираем их)
		return this.prisma.exercise.findMany({
			where: { type },
			select: {
				id: true,
				name: true,
				type: true,
				imgSrc: true,
				expressions: {
					select: {
						id: true,
						expression: true,
						example: true,
						translatedExample: true,
						exercise: true,
						description: true,
						textWithSelect: true,
						correctAnswerId: true,
						answerOptions: {
							select: {
								id: true,
								expression: true,
							},
						},
					},
				},
			},
			orderBy: { id: 'asc' },
		});
	}

	async getUsers() {
		const result = await this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				lastname: true,
				login: true,
			},
			orderBy: { id: 'asc' },
		});

		return result.filter(({ login }) => login !== ADMIN_LOGIN);
	}

	async createUser(dto: CreateUserDto) {
		const passwordHash = await argon2.hash(dto.password);

		try {
			return await this.prisma.user.create({
				data: {
					name: dto.name,
					lastname: dto.lastname ?? null,
					login: dto.login,
					passwordHash,
				},
				select: {
					id: true,
					name: true,
					lastname: true,
					login: true,
				},
			});
		} catch (e: any) {
			// Prisma unique constraint (login)
			if (e?.code === 'P2002') {
				throw new ConflictException('login already exists');
			}
			throw e;
		}
	}

	async updateUser(id: number, dto: UpdateUserDto) {
		const existing = await this.prisma.user.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('User not found');

		const data: any = {};

		if (dto.name !== undefined) data.name = dto.name;
		if (dto.lastname !== undefined) data.lastname = dto.lastname;
		if (dto.login !== undefined) data.login = dto.login;

		if (dto.password !== undefined) {
			// В БД хранится хэш, при изменении — снова хэшируем
			data.passwordHash = await argon2.hash(dto.password);
		}

		try {
			return await this.prisma.user.update({
				where: { id },
				data,
				select: {
					id: true,
					name: true,
					lastname: true,
					login: true,
				},
			});
		} catch (e: any) {
			if (e?.code === 'P2002') {
				throw new ConflictException('login already exists');
			}
			throw e;
		}
	}

	async updateExercise(id: number, dto: UpdateExerciseDto) {
		const existing = await this.prisma.exercise.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Exercise not found');

		// По ТЗ придёт только name и imgSrc
		if (!dto.name && !dto.imgSrc) {
			throw new BadRequestException('name or imgSrc must be provided');
		}

		return this.prisma.exercise.update({
			where: { id },
			data: {
				name: dto.name,
				imgSrc: dto.imgSrc,
			},
			select: {
				id: true,
				name: true,
				type: true,
				imgSrc: true,
			},
		});
	}

	async createExercise(dto: CreateExerciseDto) {
		// Если хочешь валидировать существование типа — можно проверить ExercisesTypes
		// Сейчас просто создаём
		return this.prisma.exercise.create({
			data: {
				name: dto.name,
				type: dto.type,
				imgSrc: dto.imgSrc,
			},
			select: {
				id: true,
				name: true,
				type: true,
				imgSrc: true,
			},
		});
	}

	async deleteExercisesExpression(id: number) {
		const existing = await this.prisma.exercisesExpression.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Exercises Expression not found');

		await this.prisma.exercisesExpression.delete({ where: { id } });
		return true;
	}

	async deleteUser(id: number) {
		const existing = await this.prisma.user.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('User not found');

		await this.prisma.user.delete({ where: { id } });
		return true;
	}

	async deleteExercise(id: number) {
		const existing = await this.prisma.exercise.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Exercise not found');

		await this.prisma.exercise.delete({ where: { id } });
		return true;
	}

	async createExercisesExpression(dto: CreateExercisesExpressionDto) {
		if (!dto.answerOptions || dto.answerOptions.length !== 4) {
			throw new BadRequestException('answerOptions must have exactly 4 items');
		}
		if (
			dto.correctAnswerIndex < 0 ||
			dto.correctAnswerIndex > 3 ||
			!Number.isInteger(dto.correctAnswerIndex)
		) {
			throw new BadRequestException('correctAnswerIndex must be 0..3');
		}

		// (опционально) валидация пустых строк
		if (dto.answerOptions.some((x) => !x?.trim())) {
			throw new BadRequestException('answerOptions items must be non-empty');
		}
		if (!dto.expression?.trim()) {
			throw new BadRequestException('expression is required');
		}

		return this.prisma.$transaction(async (tx) => {
			// 1) создаём 4 варианта ответа
			const createdAnswers = await Promise.all(
				dto.answerOptions.map((expression) =>
					tx.exercisesExpressionsAnswer.create({
						data: { expression },
						select: { id: true },
					})
				)
			);

			const correct = createdAnswers[dto.correctAnswerIndex];
			if (!correct) {
				throw new BadRequestException('correctAnswerIndex out of range');
			}

			// 2) создаём expression + подключаем ответы + ставим correctAnswerId
			return tx.exercisesExpression.create({
				data: {
					expression: dto.expression,
					example: dto.example ?? null,
					translatedExample: dto.translatedExample ?? null,
					exercise: dto.exercise,
					correctAnswerId: correct.id,
					answerOptions: {
						connect: createdAnswers.map((a) => ({ id: a.id })),
					},
				},
				select: { id: true },
			});
		});
	}

	async updateExercisesExpression(id: number, dto: UpdateExercisesExpressionDto) {
		if (!dto.answerOptions || dto.answerOptions.length !== 4) {
			throw new BadRequestException('answerOptions must have exactly 4 items');
		}
		if (
			dto.correctAnswerIndex === undefined ||
			!Number.isInteger(dto.correctAnswerIndex) ||
			dto.correctAnswerIndex < 0 ||
			dto.correctAnswerIndex > 3
		) {
			throw new BadRequestException('correctAnswerIndex must be 0..3');
		}

		const normalized = dto.answerOptions.map((s) => (s ?? '').trim());
		if (normalized.some((s) => !s)) {
			throw new BadRequestException('answerOptions items must be non-empty');
		}

		return this.prisma.$transaction(async (tx) => {
			const existing = await tx.exercisesExpression.findUnique({
				where: { id },
				select: {
					id: true,
					answerOptions: { select: { id: true } },
				},
			});
			if (!existing) throw new NotFoundException('ExercisesExpression not found');

			const oldAnswerIds = existing.answerOptions.map((a) => a.id);

			// создаём 4 новых answers (после фикса sequence это не будет падать)
			const newAnswers = await Promise.all(
				normalized.map((expression) =>
					tx.exercisesExpressionsAnswer.create({
						data: { expression },
						select: { id: true },
					})
				)
			);

			const correct = newAnswers[dto.correctAnswerIndex];
			if (!correct) throw new BadRequestException('correctAnswerIndex out of range');

			// заменяем связи + ставим correctAnswerId
			const updated = await tx.exercisesExpression.update({
				where: { id },
				data: {
					expression: dto.expression ?? undefined,
					example: dto.example ?? undefined,
					translatedExample: dto.translatedExample ?? undefined,

					correctAnswerId: correct.id,

					answerOptions: {
						set: newAnswers.map((a) => ({ id: a.id })), // полностью новый набор
					},
				},
				select: { id: true },
			});

			// удаляем старые answers, если они больше нигде не используются
			if (oldAnswerIds.length) {
				await tx.exercisesExpressionsAnswer.deleteMany({
					where: {
						id: { in: oldAnswerIds },
						inOptionsFor: { none: {} },
					},
				});
			}

			return updated;
		});
	}
}
