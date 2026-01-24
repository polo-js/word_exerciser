import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExerciseResultDto } from './schema/exercise-result.dto';
import { handleError, plainObjectToDTO } from '../shared/utils';

@Injectable()
export class ExercisesService {
	constructor(private readonly prismaService: PrismaService) {}

	async getExercises({
		type,
		userLogin,
	}: {
		type: number;
		userLogin: string;
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
				let passedExpressions = exercise.expressions
					.map((expression) => !!expression.progress.length)
					.filter(Boolean).length;

				if (passedExpressions > totalExpressions) {
					handleError(`Progress cannot be more than expressions count ${exercise.id}`);
					passedExpressions = totalExpressions;
				}

				return {
					...exercise,
					total: totalExpressions,
					passed: passedExpressions,
				};
			}),
		});
	}
}
