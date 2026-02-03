import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExerciseResultDto } from './schema/exercise-result.dto';
import { handleError, plainObjectToDTO, shuffle } from '../shared/utils';

@Injectable()
export class ExercisesService {
	constructor(private readonly prismaService: PrismaService) {}

	async getExercises({
		type,
		userLogin,
		max,
	}: {
		type: number;
		userLogin: string;
		max?: number;
	}): Promise<ExerciseResultDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				login: userLogin,
			},
		});

		if (!user) {
			throw new UnauthorizedException('No user found');
		}

		const exercises = await this.prismaService.exercise.findMany({
			where: {
				type,
			},
			include: {
				expressions: {
					include: {
						progress: {
							where: {
								user: user.id,
							},
						},
						answerOptions: true,
					},
				},
			},
		});

		return plainObjectToDTO(ExerciseResultDto, {
			exercises: exercises.map((exercise) => {
				const totalExpressions = exercise.expressions.length;
				let passedExpressions = exercise.expressions.filter(
					(expression) => !!expression.progress.length
				).length;

				if (passedExpressions > totalExpressions) {
					handleError(`Progress cannot be more than expressions count ${exercise.id}`);
					passedExpressions = totalExpressions;
				}

				const expressions = shuffle(
					exercise.expressions.filter((expression) => !expression.progress.length)
				).map((item, index) => ({ ...item, index: index + 1 }));

				return {
					...exercise,
					expressions: expressions.slice(0, max || expressions.length),
					total: totalExpressions,
					passed: passedExpressions,
				};
			}),
		});
	}
}
