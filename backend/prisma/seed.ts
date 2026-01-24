// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import readline from 'readline';
import { EXERCISES_TYPE } from '../src/exercises/const';

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
		exercisesTypesCount,
		exerciseCount,
		exercisesExpressionCount,
		exercisesExpressionsAnswerCount,
		exerciseExpressionProgressCount,
		referenceMaterialCount,
		referenceMaterialProgressCount,
	] = await Promise.all([
		prisma.user.count(),
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

	// --- ExercisesTypes ---
	const exerciseType = await prisma.exercisesTypes.createMany({
		data: [
			{
				id: EXERCISES_TYPE.TERMS,
				name: 'Термины',
				description: 'description',
				icon: 'icon',
			},
			{
				id: EXERCISES_TYPE.PHRASES,
				name: 'Фразы',
				description: 'description',
				icon: 'icon',
			},
		],
	});

	// --- Exercise (+ 1 Expression + Answers) ---
	const exercisesData = [
		{
			data: {
				name: 'Руки и чайники',
				exerciseType: { connect: { id: EXERCISES_TYPE.TERMS } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1, expression: 'expression1' },
									{ id: 2, expression: 'expression2' },
									{
										id: 3,
										expression: 'expression3',
									},
									{ id: 4, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression2',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 6,

							// m2m options
							answerOptions: {
								create: [
									{ id: 5, expression: 'expression1' },
									{ id: 6, expression: 'expression2' },
									{
										id: 7,
										expression: 'expression3',
									},
									{ id: 8, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression3',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							correctAnswerId: 11,

							// m2m options
							answerOptions: {
								create: [
									{ id: 9, expression: 'expression1' },
									{ id: 10, expression: 'expression2' },
									{
										id: 11,
										expression: 'expression3',
									},
									{ id: 12, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression4',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 15,

							// m2m options
							answerOptions: {
								create: [
									{ id: 13, expression: 'expression1' },
									{ id: 14, expression: 'expression2' },
									{
										id: 15,
										expression: 'expression3',
									},
									{ id: 16, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression5',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',
							textWithSelect: 'textWithSelect',

							// required relation via `answer` field
							correctAnswerId: 17,

							// m2m options
							answerOptions: {
								create: [
									{ id: 17, expression: 'expression1' },
									{ id: 18, expression: 'expression2' },
									{
										id: 19,
										expression: 'expression3',
									},
									{ id: 20, expression: 'expression4' },
								],
							},
						},
					],
				},
			},
			include: {
				expressions: { select: { id: true } },
			},
		},
		{
			data: {
				name: 'Name2',
				exerciseType: { connect: { id: EXERCISES_TYPE.TERMS } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 100,

							// m2m options
							answerOptions: {
								create: [
									{ id: 100, expression: 'expression1' },
									{ id: 101, expression: 'expression2' },
									{
										id: 102,
										expression: 'expression3',
									},
									{ id: 103, expression: 'expression4' },
								],
							},
						},
					],
				},
			},
			include: {
				expressions: { select: { id: true } },
			},
		},
		{
			data: {
				name: 'Name3',
				exerciseType: { connect: { id: EXERCISES_TYPE.TERMS } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 200,

							// m2m options
							answerOptions: {
								create: [
									{ id: 200, expression: 'expression1' },
									{ id: 201, expression: 'expression2' },
									{
										id: 202,
										expression: 'expression3',
									},
									{ id: 203, expression: 'expression4' },
								],
							},
						},
					],
				},
			},
			include: {
				expressions: { select: { id: true } },
			},
		},
	];

	const exercises = await prisma.$transaction(
		exercisesData.map(({ data }) =>
			prisma.exercise.create({
				data,
				include: { expressions: { select: { id: true } } },
			})
		)
	);

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
	console.log('✅ Seed завершён. Создан тип упражнения:', exerciseType.count);
	console.log('✅ Seed завершён. Создано упражнение:', exercises.length);
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
