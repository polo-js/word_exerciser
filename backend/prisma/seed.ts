// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import readline from 'readline';

async function confirm(question: string): Promise<boolean> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(`${question} (y/N): `, (answer) => {
			rl.close();
			resolve(answer.trim().toLowerCase() === 'y');
		});
	});
}

const prisma = new PrismaClient();

async function main() {
	// =========================
	// 1) Статус БД (как в примере)
	// =========================
	const [
		userCount,
		categoryCount,
		exercisesTypesCount,
		exerciseCount,
		exercisesExpressionCount,
		exercisesExpressionsAnswerCount,
		exerciseExpressionProgressCount,
		referenceMaterialCount,
		referenceMaterialProgressCount,
	] = await Promise.all([
		prisma.user.count(),
		prisma.category.count(),
		prisma.exercisesTypes.count(),
		prisma.exercise.count(),
		prisma.exercisesExpression.count(),
		prisma.exercisesExpressionsAnswer.count(),
		prisma.exerciseExpressionProgress.count(),
		prisma.referenceMaterial.count(),
		prisma.referenceMaterialProgress.count(),
	]);

	console.log('📊 Текущее состояние базы данных:');
	console.log(`  Users:                        ${userCount}`);
	console.log(`  Categories:                   ${categoryCount}`);
	console.log(`  ExercisesTypes:               ${exercisesTypesCount}`);
	console.log(`  Exercises:                    ${exerciseCount}`);
	console.log(`  ExercisesExpression:          ${exercisesExpressionCount}`);
	console.log(`  ExercisesExpressionsAnswer:   ${exercisesExpressionsAnswerCount}`);
	console.log(`  ExerciseExpressionProgress:   ${exerciseExpressionProgressCount}`);
	console.log(`  ReferenceMaterial:            ${referenceMaterialCount}`);
	console.log(`  ReferenceMaterialProgress:    ${referenceMaterialProgressCount}`);
	console.log('');

	// =========================
	// 2) Подтверждение перед удалением (shouldResult)
	// =========================
	const shouldResult = await confirm('⚠️  Удалить все данные перед сидом?');

	if (shouldResult) {
		console.log('🧹 Очистка таблиц...');

		// FK-safe порядок
		await prisma.exerciseExpressionProgress.deleteMany();
		await prisma.referenceMaterialProgress.deleteMany();

		await prisma.exercisesExpression.deleteMany();
		await prisma.exercisesExpressionsAnswer.deleteMany();

		await prisma.exercise.deleteMany();
		await prisma.exercisesTypes.deleteMany();
		await prisma.category.deleteMany();

		await prisma.referenceMaterial.deleteMany();
		await prisma.user.deleteMany();

		console.log('✅ Все данные удалены.\n');
	} else {
		console.log('⏩ Пропускаем очистку, добавляем новые данные поверх.\n');
	}

	// =========================
	// 3) Создание структуры (по 1 примеру)
	// =========================

	// --- User ---
	const user = await prisma.user.create({
		data: {
			name: 'Кефир',
			lastname: 'Кефиров',
			passwordHash:
				'$argon2id$v=19$m=65536,t=3,p=4$80/6x+ObSjRnhqvgwuA9og$nHEDE9A4oqnhbXiuQuVWOXsvb9pz+ueEBKXbVv/4c90',
			login: 'kefir',
		},
	});

	// --- Category ---
	const category = await prisma.category.create({
		data: {
			name: 'name',
			imageSrc: 'imageSrc',
		},
	});

	// --- ExercisesTypes ---
	const exerciseType = await prisma.exercisesTypes.create({
		data: {
			name: 'name',
			description: 'description',
			icon: 'icon',
		},
	});

	// --- Exercise (+ 1 Expression + Answers) ---
	const exercise = await prisma.exercise.create({
		data: {
			name: 'name',
			exerciseType: { connect: { id: exerciseType.id } }, // FK type
			categoryRel: { connect: { id: category.id } }, // FK category
			expressions: {
				create: [
					{
						expression: 'expression',
						example: 'example',
						translatedExample: 'translatedExample',
						description: 'description',
						textWithSelect: 'textWithSelect',

						// required relation via `answer` field
						correctAnswer: {
							create: { expression: 'expression' },
						},

						// m2m options
						answerOptions: {
							create: [{ expression: 'expression' }],
						},
					},
				],
			},
		},
		include: {
			expressions: { select: { id: true } },
		},
	});

	const expressionId = exercise.expressions[0]?.id;

	// --- ReferenceMaterial ---
	const referenceMaterial = await prisma.referenceMaterial.createMany({
		data: [
			{
				title: '1',
				description: 'description',
				hrefToMaterials: '/reference-materials/test',
				imgSrc: '/assets/img/education.svg',
			},
			{
				title: '2',
				description: 'description',
				hrefToMaterials: '/profile',
				imgSrc: '/assets/img/education.svg',
			},
			{
				title: '3',
				description: 'description',
				hrefToMaterials: '/profile',
				imgSrc: '/assets/img/education.svg',
			},
			{
				title: '4',
				description: 'description',
				hrefToMaterials: '/profile',
				imgSrc: '/assets/img/education.svg',
			},
		],
	});

	// --- Progresses ---
	// if (expressionId) {
	// 	await prisma.exerciseExpressionProgress.create({
	// 		data: {
	// 			user: user.id,
	// 			exerciseExpression: expressionId,
	// 		},
	// 	});
	// }

	// await prisma.referenceMaterialProgress.create({
	// 	data: {
	// 		user: user.id,
	// 		referenceMaterial: referenceMaterial.id,
	// 	},
	// });

	// =========================
	// 4) Финальный статус (как в примере)
	// =========================
	console.log('✅ Seed завершён. Создан пользователь:', user.login);
	console.log('✅ Seed завершён. Создана категория:', category.name);
	console.log('✅ Seed завершён. Создан тип упражнения:', exerciseType.name);
	console.log('✅ Seed завершён. Создано упражнение:', exercise.name);
	console.log('✅ Seed завершён. Создан материал:', referenceMaterial.count);
}

main()
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
