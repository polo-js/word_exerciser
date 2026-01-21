import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProgressDto } from './schemas/progress.dto';
import { ProfileProgressDto } from './schemas/profile-progress.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
	EXERCISES_PHRASES_TYPE,
	EXERCISES_TERMS_TYPE,
	FINAL_TEST_THRESHOLD_PERCENT,
	MATERIALS_SYNTHETIC_TYPE,
	PART_PROGRESS_SETTINGS,
} from './const';
import {
	ExerciseExpressionProgress,
	ReferenceMaterialProgress,
	User,
} from '@prisma/client';
import { ALL_EXERCISES_TYPES, ONLY_EXERCISES_TYPES } from './types/exercises-types';
import { isDevelopment } from '../const';
import { plainObjectToDTO } from '../shared/utils';

type IProgressByType = Record<ALL_EXERCISES_TYPES, { total: number; passed: number }>;

const TERMS_WITH_PHRASES_TYPE: ONLY_EXERCISES_TYPES[] = [
	EXERCISES_TERMS_TYPE,
	EXERCISES_PHRASES_TYPE,
];
const MAX_EXERCISES_ENTITY_PERCENT: Record<ALL_EXERCISES_TYPES, number> = {
	[EXERCISES_TERMS_TYPE]: 60,
	[EXERCISES_PHRASES_TYPE]: 30,
	[MATERIALS_SYNTHETIC_TYPE]: 10,
};

@Injectable()
export class ProgressService {
	constructor(
		private readonly usersService: UsersService,
		private readonly prismaService: PrismaService
	) {}

	async getProfileProgress(login: string): Promise<ProfileProgressDto> {
		const user: User = await this.usersService.findByLogin(login);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const [
			exercisesProgressByType,
			exercisesExpressionsCount,
			referenceMaterialProgress,
			referenceMaterialCount,
		] = await Promise.all([
			this.getExercisesProgressByType(user.id),
			this.getExercisesExpressionsCount(),
			this.getReferenceMaterialProgress(user.id),
			this.getReferenceMaterialCount(),
		]);

		const progressByType: IProgressByType = {
			[EXERCISES_PHRASES_TYPE]: {
				total: exercisesExpressionsCount[EXERCISES_PHRASES_TYPE],
				passed: exercisesProgressByType[EXERCISES_PHRASES_TYPE].length,
			},
			[EXERCISES_TERMS_TYPE]: {
				total: exercisesExpressionsCount[EXERCISES_TERMS_TYPE],
				passed: exercisesProgressByType[EXERCISES_TERMS_TYPE].length,
			},
			[MATERIALS_SYNTHETIC_TYPE]: {
				total: referenceMaterialCount,
				passed: referenceMaterialProgress.length,
			},
		};

		const totalProgress: number = this.getOverallProgress(progressByType);
		const progressList = this.getProgressList(progressByType);

		return plainObjectToDTO(ProfileProgressDto, {
			totalProgress,
			finalTestThresholdPercent: FINAL_TEST_THRESHOLD_PERCENT,
			finalTestIsAvailable: totalProgress >= FINAL_TEST_THRESHOLD_PERCENT,
			progressList,
		});
	}

	async setMaterialProgress({ id, userLogin }: { id: number; userLogin: string }) {
		const materialReference = await this.prismaService.referenceMaterial.findUnique({
			where: { id },
		});

		if (!materialReference) {
			throw new NotFoundException('Material reference does not exist');
		}

		const user = await this.prismaService.user.findUnique({
			where: {
				login: userLogin,
			},
		});

		if (!user) {
			throw new NotFoundException('User does not exist');
		}

		return this.prismaService.referenceMaterialProgress.upsert({
			where: {
				user_referenceMaterial: {
					user: user.id,
					referenceMaterial: id,
				},
			},
			update: {}, // ничего не обновляем
			create: {
				user: user.id,
				referenceMaterial: id,
			},
		});
	}

	async deleteMaterialProgress({ id, userLogin }: { id: number; userLogin: string }) {
		const materialReference = await this.prismaService.referenceMaterial.findUnique({
			where: { id },
		});

		if (!materialReference) {
			throw new NotFoundException('Material reference does not exist');
		}

		const user = await this.prismaService.user.findUnique({
			where: {
				login: userLogin,
			},
		});

		if (!user) {
			throw new NotFoundException('User does not exist');
		}

		return this.prismaService.referenceMaterialProgress.delete({
			where: {
				user_referenceMaterial: {
					referenceMaterial: id,
					user: user.id,
				},
			},
		});
	}

	getReferenceMaterialProgress(userId: number): Promise<ReferenceMaterialProgress[]> {
		return this.prismaService.referenceMaterialProgress.findMany({
			where: {
				user: userId,
			},
		});
	}

	getReferenceMaterialCount(): Promise<number> {
		return this.prismaService.referenceMaterial.count();
	}

	protected getProgressList(progressByType: IProgressByType): ProgressDto[] {
		return Object.entries(progressByType).map(([type, { passed, total }]) => ({
			...PART_PROGRESS_SETTINGS[type],
			progressText: `${passed}/${total} ${type === MATERIALS_SYNTHETIC_TYPE ? 'просмотрено' : 'изучено'}`,
		}));
	}

	protected getExercisesExpressionsCount(): Promise<
		Record<ONLY_EXERCISES_TYPES, number>
	> {
		return this.getExercisesInfoByType<number>((type) =>
			this.prismaService.exercisesExpression.count({
				where: {
					exerciseRel: {
						type,
					},
				},
			})
		);
	}

	protected getExercisesProgressByType(
		userId: number
	): Promise<Record<ONLY_EXERCISES_TYPES, ExerciseExpressionProgress[]>> {
		return this.getExercisesInfoByType<ExerciseExpressionProgress[]>((type) =>
			this.prismaService.exerciseExpressionProgress.findMany({
				where: {
					user: userId,
					exercisesExpressionRel: {
						exerciseRel: {
							type,
						},
					},
				},
			})
		);
	}

	protected getOverallProgress(progress: IProgressByType): number {
		const progressSum = Object.entries(progress).reduce((acc, [key, progressObj]) => {
			let { passed, total } = progressObj;

			if (passed > total) {
				passed = total;
				this.handleError('Total progress cant be more than passed progress');
			}

			const progressCoefficient = MAX_EXERCISES_ENTITY_PERCENT[key];
			const passedProgressPercent = total ? passed / total : 0;

			return acc + passedProgressPercent * progressCoefficient;
		}, 0);

		if (progressSum > 100) {
			this.handleError('Overall progress cant be more than 100');
			return 0;
		}

		return progressSum;
	}

	private async getExercisesInfoByType<T>(
		cb: (type: number) => Promise<T>
	): Promise<Record<ONLY_EXERCISES_TYPES, T>> {
		const typesWithCount = await Promise.all(
			TERMS_WITH_PHRASES_TYPE.map((innerType) => {
				return Promise.all([innerType, cb(innerType)]);
			})
		);
		return Object.fromEntries(typesWithCount) as Record<ONLY_EXERCISES_TYPES, T>;
	}

	private handleError(str: string): void {
		if (isDevelopment) {
			throw new InternalServerErrorException(str);
		} else {
			console.error(str);
		}
	}
}
