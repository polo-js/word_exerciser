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
			name: 'Антон',
			lastname: 'Васильев',
			passwordHash:
				'$argon2id$v=19$m=65536,t=3,p=4$80/6x+ObSjRnhqvgwuA9og$nHEDE9A4oqnhbXiuQuVWOXsvb9pz+ueEBKXbVv/4c90',
			login: 'AVasilev',
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
		// ТЕРМИНЫ
		{
			data: {
				name: 'Общие термины и процессы закупок',
				exerciseType: { connect: { id: EXERCISES_TYPE.TERMS } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
						{
							expression: 'procurement/purchasing',
							example: 'The |procurement/purchasing| department handles requests for goods and services.',
							translatedExample: 'Отдел |закупок| обрабатывает заявки на товары и услуги.',

							// required relation via `answer` field
							correctAnswerId: 2,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1, expression: 'поставка' },
									{ id: 2, expression: 'закупка' },
									{
										id: 3,
										expression: 'договор',
									},
									{ id: 4, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'sourcing',
							example: '|Sourcing| involves evaluating vendors before signing a contract.',
							translatedExample: '|Выбор поставщика| включает оценку контрагентов перед подписанием договора.',
							
							correctAnswerId: 7,
							answerOptions: {
								create: [
								{ id: 5, expression: 'отгрузка' },
								{ id: 6, expression: 'процесс закупки' },
								{ id: 7, expression: 'поиск/выбор поставщика' },
								{ id: 8, expression: 'склад' },
								],
							},
						},
						{
							expression: 'buyer',
							example: 'The |buyer| contacted the supplier to clarify delivery terms.',
							translatedExample: '|Закупщик| связался с поставщиком для уточнения условий поставки.',
							description: 'buyer — закупщик',

							correctAnswerId: 10,
							answerOptions: {
								create: [
								{ id: 9, expression: 'клиент' },
								{ id: 10, expression: 'закупщик' },
								{ id: 11, expression: 'поставщик' },
								{ id: 12, expression: 'перевозчик' },
								],
							},
						},
						{
							expression: 'supplier',
							example: 'The |supplier| provides goods according to the contract.',
							translatedExample: '|Поставщик| поставляет товары в соответствии с договором.',
							description: 'vendor / supplier — поставщик',

							correctAnswerId: 15,
							answerOptions: {
								create: [
								{ id: 13, expression: 'покупатель' },
								{ id: 14, expression: 'посредник' },
								{ id: 15, expression: 'поставщик' },
								{ id: 16, expression: 'заказчик' },
								],
							},
						},
						{
							expression: 'tender',
							example: 'The company announced a |tender| for equipment supply.',
							translatedExample: 'Компания объявила |тендер| на поставку оборудования.',
							description: 'tender — тендер',

							correctAnswerId: 19,
							answerOptions: {
								create: [
								{ id: 17, expression: 'договор' },
								{ id: 18, expression: 'счёт' },
								{ id: 19, expression: 'тендер' },
								{ id: 20, expression: 'заказ' },
								],
							},
						},
						{
							expression: 'inquiry',
							example: 'We sent an |inquiry| to the supplier and requested a quotation.',
							translatedExample: 'Мы направили поставщику |запрос| и запросили коммерческое предложение.',
							description: 'inquiry / request — запрос',

							correctAnswerId: 22,
							answerOptions: {
								create: [
								{ id: 21, expression: 'поставка' },
								{ id: 22, expression: 'запрос' },
								{ id: 23, expression: 'платёж' },
								{ id: 24, expression: 'договор' },
								],
							},
						},
						{
							expression: 'quotation',
							example: 'The |quotation| includes prices and delivery time.',
							translatedExample: '|Коммерческое предложение| включает цены и сроки поставки.',
							description: 'quotation — коммерческое предложение',

							correctAnswerId: 26,
							answerOptions: {
								create: [
								{ id: 25, expression: 'счёт' },
								{ id: 26, expression: 'коммерческое предложение' },
								{ id: 27, expression: 'заказ' },
								{ id: 28, expression: 'договор' },
								],
							},
						},
						{
							expression: 'purchase order',
							example: 'A |purchase order| was issued after approval.',
							translatedExample: '|Заказ на поставку| был оформлен после согласования.',
							description: 'purchase order — заказ на поставку',

							correctAnswerId: 31,
							answerOptions: {
								create: [
								{ id: 29, expression: 'счёт' },
								{ id: 30, expression: 'договор' },
								{ id: 31, expression: 'заказ на поставку' },
								{ id: 32, expression: 'спецификация' },
								],
							},
						},
						{
							expression: 'contract',
							example: 'The |contract| defines payment and delivery conditions.',
							translatedExample: '|Договор| определяет условия оплаты и поставки.',
							description: 'contract — договор',

							correctAnswerId: 35,
							answerOptions: {
								create: [
								{ id: 33, expression: 'соглашение' },
								{ id: 34, expression: 'заказ' },
								{ id: 35, expression: 'договор' },
								{ id: 36, expression: 'запрос' },
								],
							},
						},
						{
							expression: 'agreement',
							example: 'Both parties signed an |agreement|.',
							translatedExample: 'Обе стороны подписали |соглашение|.',
							description: 'agreement — соглашение',

							correctAnswerId: 38,
							answerOptions: {
								create: [
								{ id: 37, expression: 'платёж' },
								{ id: 38, expression: 'соглашение' },
								{ id: 39, expression: 'заказ' },
								{ id: 40, expression: 'спецификация' },
								],
							},
						},
						{
							expression: 'delivery',
							example: 'The |delivery| is scheduled for next week.',
							translatedExample: '|Поставка| запланирована на следующую неделю.',
							description: 'delivery — поставка',

							correctAnswerId: 42,
							answerOptions: {
								create: [
								{ id: 41, expression: 'отгрузка' },
								{ id: 42, expression: 'поставка' },
								{ id: 43, expression: 'заказ' },
								{ id: 44, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'shipment',
							example: 'The |shipment| was delayed due to customs clearance.',
							translatedExample: '|Отгрузка| была задержана из-за таможенного оформления.',
							description: 'shipment — отгрузка',

							correctAnswerId: 47,
							answerOptions: {
								create: [
								{ id: 45, expression: 'поставка' },
								{ id: 46, expression: 'заказ' },
								{ id: 47, expression: 'отгрузка' },
								{ id: 48, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'lead time',
							example: 'The |lead time| is four weeks.',
							translatedExample: '|Срок поставки| составляет четыре недели.',
							description: 'lead time — срок поставки',

							correctAnswerId: 50,
							answerOptions: {
								create: [
								{ id: 49, expression: 'срок оплаты' },
								{ id: 50, expression: 'срок поставки' },
								{ id: 51, expression: 'цена' },
								{ id: 52, expression: 'количество' },
								],
							},
						},
						{
							expression: 'price',
							example: 'The |price| includes transportation costs.',
							translatedExample: '|Цена| включает транспортные расходы.',
							description: 'price — цена',

							correctAnswerId: 54,
							answerOptions: {
								create: [
								{ id: 53, expression: 'стоимость' },
								{ id: 54, expression: 'цена' },
								{ id: 55, expression: 'платёж' },
								{ id: 56, expression: 'скидка' },
								],
							},
						},
						{
							expression: 'cost',
							example: 'The total |cost| was higher than expected.',
							translatedExample: 'Общая |стоимость| оказалась выше ожидаемой.',
							description: 'cost — стоимость',

							correctAnswerId: 59,
							answerOptions: {
								create: [
								{ id: 57, expression: 'цена' },
								{ id: 58, expression: 'скидка' },
								{ id: 59, expression: 'стоимость' },
								{ id: 60, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'payment',
							example: '|Payment| must be completed within 30 days.',
							translatedExample: '|Платёж| должен быть выполнен в течение 30 дней.',
							description: 'payment — платёж',

							correctAnswerId: 61,
							answerOptions: {
								create: [
								{ id: 61, expression: 'платёж' },
								{ id: 62, expression: 'поставка' },
								{ id: 63, expression: 'заказ' },
								{ id: 64, expression: 'договор' },
								],
							},
						},
						{
							expression: 'invoice',
							example: 'The |invoice| was sent after shipment.',
							translatedExample: '|Счёт| был отправлен после отгрузки.',
							description: 'invoice — счёт',

							correctAnswerId: 67,
							answerOptions: {
								create: [
								{ id: 65, expression: 'заказ' },
								{ id: 66, expression: 'договор' },
								{ id: 67, expression: 'счёт' },
								{ id: 68, expression: 'запрос' },
								],
							},
						},
						{
							expression: 'terms',
							example: 'Payment |terms| are specified in the contract conditions.',
							translatedExample: '|Условия| оплаты указаны в условиях договора.',
							description: 'terms / conditions — условия',

							correctAnswerId: 70,
							answerOptions: {
								create: [
								{ id: 69, expression: 'цена' },
								{ id: 70, expression: 'условия' },
								{ id: 71, expression: 'скидка' },
								{ id: 72, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'negotiation',
							example: '|Negotiation| helped reduce the final price.',
							translatedExample: '|Переговоры| помогли снизить итоговую цену.',
							description: 'negotiation — переговоры',

							correctAnswerId: 74,
							answerOptions: {
								create: [
								{ id: 73, expression: 'согласование' },
								{ id: 74, expression: 'переговоры' },
								{ id: 75, expression: 'платёж' },
								{ id: 76, expression: 'поставка' },
								],
							},
						},
						{
							expression: 'approval',
							example: 'The contract requires management |approval|.',
							translatedExample: 'Договор требует |согласования| с руководством.',
							description: 'approval — согласование',

							correctAnswerId: 78,
							answerOptions: {
								create: [
								{ id: 77, expression: 'подтверждение' },
								{ id: 78, expression: 'согласование' },
								{ id: 79, expression: 'заказ' },
								{ id: 80, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'specification',
							example: 'The |specification| describes technical requirements.',
							translatedExample: '|Спецификация| описывает технические требования.',
							description: 'specification — спецификация',

							correctAnswerId: 82,
							answerOptions: {
								create: [
								{ id: 81, expression: 'договор' },
								{ id: 82, expression: 'спецификация' },
								{ id: 83, expression: 'счёт' },
								{ id: 84, expression: 'заказ' },
								],
							},
						},
						{
							expression: 'requirements',
							example: 'All |requirements| must be met before delivery.',
							translatedExample: 'Все |требования| должны быть выполнены до поставки.',
							description: 'requirements — требования',

							correctAnswerId: 86,
							answerOptions: {
								create: [
								{ id: 85, expression: 'условия' },
								{ id: 86, expression: 'требования' },
								{ id: 87, expression: 'цена' },
								{ id: 88, expression: 'срок' },
								],
							},
						},
						{
							expression: 'documentation',
							example: 'All |documentation| must be provided before shipment.',
							translatedExample: 'Вся |документация| должна быть предоставлена до отгрузки.',
							description: 'documentation — документация',

							correctAnswerId: 90,
							answerOptions: {
								create: [
								{ id: 89, expression: 'счёт' },
								{ id: 90, expression: 'документация' },
								{ id: 91, expression: 'заказ' },
								{ id: 92, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'process',
							example: 'The procurement |process| was optimized.',
							translatedExample: 'Процесс закупок был |оптимизирован|.',
							description: 'process — процесс',

							correctAnswerId: 94,
							answerOptions: {
								create: [
								{ id: 93, expression: 'поставка' },
								{ id: 94, expression: 'процесс' },
								{ id: 95, expression: 'договор' },
								{ id: 96, expression: 'платёж' },
								],
							},
						},
						{
							expression: 'order',
							example: 'The |order| was placed after approval.',
							translatedExample: '|Заказ| был размещён после согласования.',
							description: 'order — заказ',

							correctAnswerId: 98,
							answerOptions: {
								create: [
								{ id: 97, expression: 'счёт' },
								{ id: 98, expression: 'заказ' },
								{ id: 99, expression: 'договор' },
								{ id: 100, expression: 'поставка' },
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
				name: 'Коммерческие предложения и договорные условия',
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
							correctAnswerId: 102,

							// m2m options
							answerOptions: {
								create: [
									{ id: 101, expression: 'expression1' },
									{ id: 102, expression: 'expression2' },
									{
										id: 103,
										expression: 'expression3',
									},
									{ id: 104, expression: 'expression4' },
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
				name: 'Деловая коммуникация и сопровождение поставок',
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
		// 	ФРАЗЫ
		{
			data: {
				name: 'Блатные фразы',
				exerciseType: { connect: { id: EXERCISES_TYPE.PHRASES } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
						{
							expression: 'expression1',
							example: 'example |Yana cist|',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1000,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1000, expression: 'expression1' },
									{ id: 1001, expression: 'expression2' },
									{
										id: 1002,
										expression: 'expression3',
									},
									{ id: 1003, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1100,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1100, expression: 'expression1' },
									{ id: 1101, expression: 'expression2' },
									{
										id: 1102,
										expression: 'expression3',
									},
									{ id: 1103, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1200,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1200, expression: 'expression1' },
									{ id: 1201, expression: 'expression2' },
									{
										id: 1202,
										expression: 'expression3',
									},
									{ id: 1203, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1300,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1300, expression: 'expression1' },
									{ id: 1301, expression: 'expression2' },
									{
										id: 1302,
										expression: 'expression3',
									},
									{ id: 1303, expression: 'expression4' },
								],
							},
						},
						{
							expression: 'expression1',
							example: 'example',
							translatedExample: 'translatedExample',
							description: 'description',

							// required relation via `answer` field
							correctAnswerId: 1400,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1400, expression: 'expression1' },
									{ id: 1401, expression: 'expression2' },
									{
										id: 1402,
										expression: 'expression3',
									},
									{ id: 1403, expression: 'expression4' },
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
				title: 'Incoterms 2020',
				description: 'Базисы поставки и ответственность сторон (расходы, риски, доставка).',
				hrefToMaterials: '/reference-materials/incoterms',
				imgSrc: '/assets/img/incoterms.svg',
			},
			{
				title: 'Типовые документы в закупках',
				description: 'Ключевые документы закупочного цикла и их роль.',
				hrefToMaterials: '/reference-materials/documents',
				imgSrc: '/assets/img/contract.svg',
			},
			{
				title: 'Структура деловой переписки',
				description: 'Структура письма, логика общения и деловой тон.',
				hrefToMaterials: '/reference-materials/communication',
				imgSrc: '/assets/img/email.svg',
			},
			{
				title: 'Коммуникативные ситуации',
				description: 'Запрос информации, согласование условий, уточнения, напоминания: цель фраз и контекст применения.',
				hrefToMaterials: '/reference-materials/situations',
				imgSrc: '/assets/img/chat.svg',
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
