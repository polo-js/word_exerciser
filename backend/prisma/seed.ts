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
							expression: 'procurement',
							example: 'The |procurement/purchasing| department handles requests for goods and services.',
							translatedExample: 'Отдел |закупок| обрабатывает заявки на товары и услуги.',

							// required relation via `answer` field
							correctAnswerId: 2,

							// m2m options
							answerOptions: {
								create: [
									{ id: 1, expression: 'поставка' },
									{ id: 2, expression: 'закупки' },
									{ id: 3, expression: 'договор',},
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
								{ id: 7, expression: 'выбор поставщика' },
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
						expression: 'offer',
						example: 'Please send your |offer| by Friday.',
						translatedExample: 'Пожалуйста, отправьте ваше |предложение| до пятницы.',
						correctAnswerId: 102,
						answerOptions: {
						create: [
							{ id: 101, expression: 'бюджет' },
							{ id: 102, expression: 'предложение' },
							{ id: 103, expression: 'крайний срок' },
							{ id: 104, expression: 'валюта' },
						],
						},
					},
					{
						expression: 'proposal',
						example: 'We reviewed your |proposal| and will get back to you soon.',
						translatedExample: 'Мы рассмотрели ваш |проект предложения| и скоро ответим.',
						correctAnswerId: 106,
						answerOptions: {
						create: [
							{ id: 105, expression: 'скидка' },
							{ id: 106, expression: 'проект предложения' },
							{ id: 107, expression: 'партия' },
							{ id: 108, expression: 'пошлина' },
						],
						},
					},
					{
						expression: 'deadline',
						example: 'The |deadline| for submitting documents is Monday.',
						translatedExample: '|Крайний срок| подачи документов — понедельник.',
						correctAnswerId: 110,
						answerOptions: {
						create: [
							{ id: 109, expression: 'налог' },
							{ id: 110, expression: 'крайний срок' },
							{ id: 111, expression: 'объём' },
							{ id: 112, expression: 'наценка' },
						],
						},
					},
					{
						expression: 'validity',
						example: 'The |validity| of this offer is 30 days.',
						translatedExample: '|Срок действия| этого предложения — 30 дней.',
						correctAnswerId: 114,
						answerOptions: {
						create: [
							{ id: 113, expression: 'итоговая сумма' },
							{ id: 114, expression: 'срок действия' },
							{ id: 115, expression: 'курс обмена' },
							{ id: 116, expression: 'сбор' },
						],
						},
					},
					{
						expression: 'budget',
						example: 'This option is within our |budget|.',
						translatedExample: 'Этот вариант укладывается в наш |бюджет|.',
						correctAnswerId: 118,
						answerOptions: {
						create: [
							{ id: 117, expression: 'чек' },
							{ id: 118, expression: 'бюджет' },
							{ id: 119, expression: 'наличные' },
							{ id: 120, expression: 'штраф' },
						],
						},
					},
					{
						expression: 'quantity',
						example: 'Please confirm the |quantity| for the first batch.',
						translatedExample: 'Пожалуйста, подтвердите |количество| для первой партии.',
						correctAnswerId: 122,
						answerOptions: {
						create: [
							{ id: 121, expression: 'валюта' },
							{ id: 122, expression: 'количество' },
							{ id: 123, expression: 'пошлина' },
							{ id: 124, expression: 'рассрочка' },
						],
						},
					},
					{
						expression: 'volume',
						example: 'We can increase the |volume| next month.',
						translatedExample: 'Мы можем увеличить |объём| в следующем месяце.',
						correctAnswerId: 126,
						answerOptions: {
						create: [
							{ id: 125, expression: 'скидка' },
							{ id: 126, expression: 'объём' },
							{ id: 127, expression: 'срок действия' },
							{ id: 128, expression: 'банковский перевод' },
						],
						},
					},
					{
						expression: 'batch',
						example: 'The first |batch| will be ready next week.',
						translatedExample: 'Первая |партия| будет готова на следующей неделе.',
						correctAnswerId: 130,
						answerOptions: {
						create: [
							{ id: 129, expression: 'наценка' },
							{ id: 130, expression: 'партия' },
							{ id: 131, expression: 'налог' },
							{ id: 132, expression: 'чек' },
						],
						},
					},
					{
						expression: 'discount',
						example: 'We can offer a |discount| for large volumes.',
						translatedExample: 'Мы можем предложить |скидку| при больших объёмах.',
						correctAnswerId: 134,
						answerOptions: {
						create: [
							{ id: 133, expression: 'пошлина' },
							{ id: 134, expression: 'скидка' },
							{ id: 135, expression: 'задаток' },
							{ id: 136, expression: 'крайний срок' },
						],
						},
					},
					{
						expression: 'markup',
						example: 'The final price includes a |markup|.',
						translatedExample: 'Итоговая цена включает |наценку|.',
						correctAnswerId: 138,
						answerOptions: {
						create: [
							{ id: 137, expression: 'аванс' },
							{ id: 138, expression: 'наценка' },
							{ id: 139, expression: 'валюта' },
							{ id: 140, expression: 'партия' },
						],
						},
					},
					{
						expression: 'fee',
						example: 'A service |fee| applies to this option.',
						translatedExample: 'Для этого варианта применяется сервисный |сбор|.',
						correctAnswerId: 142,
						answerOptions: {
						create: [
							{ id: 141, expression: 'рассрочка' },
							{ id: 142, expression: 'сбор' },
							{ id: 143, expression: 'объём' },
							{ id: 144, expression: 'отмена' },
						],
						},
					},
					{
						expression: 'tax',
						example: 'Local |tax| may be added.',
						translatedExample: 'Может быть добавлен местный |налог|.',
						correctAnswerId: 146,
						answerOptions: {
						create: [
							{ id: 145, expression: 'пошлина' },
							{ id: 146, expression: 'налог' },
							{ id: 147, expression: 'чек' },
							{ id: 148, expression: 'бюджет' },
						],
						},
					},
					{
						expression: 'duty',
						example: 'Import |duty| depends on the destination country.',
						translatedExample: 'Импортная |пошлина| зависит от страны назначения.',
						correctAnswerId: 150,
						answerOptions: {
						create: [
							{ id: 149, expression: 'сбор' },
							{ id: 150, expression: 'пошлина' },
							{ id: 151, expression: 'скидка' },
							{ id: 152, expression: 'курс обмена' },
						],
						},
					},
					{
						expression: 'currency',
						example: 'Please specify the |currency| in your offer.',
						translatedExample: 'Пожалуйста, укажите |валюту| в вашем предложении.',
						correctAnswerId: 154,
						answerOptions: {
						create: [
							{ id: 153, expression: 'квитанция' },
							{ id: 154, expression: 'валюта' },
							{ id: 155, expression: 'штраф' },
							{ id: 156, expression: 'количество' },
						],
						},
					},
					{
						expression: 'exchange rate',
						example: 'The |exchange rate| changed this week.',
						translatedExample: 'На этой неделе изменился |курс обмена|.',
						correctAnswerId: 158,
						answerOptions: {
						create: [
							{ id: 157, expression: 'итоговая сумма' },
							{ id: 158, expression: 'курс обмена' },
							{ id: 159, expression: 'срок действия' },
							{ id: 160, expression: 'наценка' },
						],
						},
					},
					{
						expression: 'total amount',
						example: 'Please confirm the |total amount|.',
						translatedExample: 'Пожалуйста, подтвердите |итоговую сумму|.',
						correctAnswerId: 162,
						answerOptions: {
						create: [
							{ id: 161, expression: 'промежуточный итог' },
							{ id: 162, expression: 'итоговая сумма' },
							{ id: 163, expression: 'аванс' },
							{ id: 164, expression: 'пошлина' },
						],
						},
					},
					{
						expression: 'subtotal',
						example: 'The |subtotal| is shown before taxes.',
						translatedExample: '|Промежуточный итог| указан до налогов.',
						correctAnswerId: 166,
						answerOptions: {
						create: [
							{ id: 165, expression: 'задаток' },
							{ id: 166, expression: 'промежуточный итог' },
							{ id: 167, expression: 'наличные' },
							{ id: 168, expression: 'скидка' },
						],
						},
					},
					{
						expression: 'advance',
						example: 'An |advance| of 20% is required.',
						translatedExample: 'Требуется |аванс| 20%.',
						correctAnswerId: 170,
						answerOptions: {
						create: [
							{ id: 169, expression: 'штраф' },
							{ id: 170, expression: 'аванс' },
							{ id: 171, expression: 'квитанция' },
							{ id: 172, expression: 'валюта' },
						],
						},
					},
					{
						expression: 'deposit',
						example: 'A |deposit| is needed to reserve the option.',
						translatedExample: 'Для бронирования требуется |задаток|.',
						correctAnswerId: 174,
						answerOptions: {
						create: [
							{ id: 173, expression: 'сбор' },
							{ id: 174, expression: 'задаток' },
							{ id: 175, expression: 'объём' },
							{ id: 176, expression: 'отмена' },
						],
						},
					},
					{
						expression: 'installment',
						example: 'We can split the amount into an |installment| plan.',
						translatedExample: 'Мы можем разбить сумму на |рассрочку|.',
						correctAnswerId: 178,
						answerOptions: {
						create: [
							{ id: 177, expression: 'наценка' },
							{ id: 178, expression: 'рассрочка' },
							{ id: 179, expression: 'партия' },
							{ id: 180, expression: 'пошлина' },
						],
						},
					},
					{
						expression: 'bank transfer',
						example: 'We accept |bank transfer|.',
						translatedExample: 'Мы принимаем |банковский перевод|.',
						correctAnswerId: 182,
						answerOptions: {
						create: [
							{ id: 181, expression: 'наличные' },
							{ id: 182, expression: 'банковский перевод' },
							{ id: 183, expression: 'чек' },
							{ id: 184, expression: 'скидка' },
						],
						},
					},
					{
						expression: 'cash',
						example: '|Cash| is accepted at the office.',
						translatedExample: 'В офисе принимаются |наличные|.',
						correctAnswerId: 186,
						answerOptions: {
						create: [
							{ id: 185, expression: 'банковский перевод' },
							{ id: 186, expression: 'наличные' },
							{ id: 187, expression: 'валюта' },
							{ id: 188, expression: 'бюджет' },
						],
						},
					},
					{
						expression: 'receipt',
						example: 'Please keep the |receipt|.',
						translatedExample: 'Пожалуйста, сохраните |чек|.',
						correctAnswerId: 190,
						answerOptions: {
						create: [
							{ id: 189, expression: 'сбор' },
							{ id: 190, expression: 'чек' },
							{ id: 191, expression: 'пошлина' },
							{ id: 192, expression: 'скидка' },
						],
						},
					},
					{
						expression: 'penalty',
						example: 'A |penalty| may apply if you are late.',
						translatedExample: 'При опоздании может применяться |штраф|.',
						correctAnswerId: 194,
						answerOptions: {
						create: [
							{ id: 193, expression: 'отмена' },
							{ id: 194, expression: 'штраф' },
							{ id: 195, expression: 'срок действия' },
							{ id: 196, expression: 'бюджет' },
						],
						},
					},
					{
						expression: 'cancellation',
						example: 'Free |cancellation| is available within 24 hours.',
						translatedExample: 'Бесплатная |отмена| доступна в течение 24 часов.',
						correctAnswerId: 198,
						answerOptions: {
						create: [
							{ id: 197, expression: 'задаток' },
							{ id: 198, expression: 'отмена' },
							{ id: 199, expression: 'промежуточный итог' },
							{ id: 200, expression: 'банковский перевод' },
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
						expression: 'email communication',
						example: '|Email communication| is used to share updates and clarify details.',
						translatedExample: '|Электронная переписка| используется, чтобы обмениваться обновлениями и уточнять детали.',
						correctAnswerId: 203,
						answerOptions: {
						create: [
							{ id: 201, expression: 'встреча' },
							{ id: 202, expression: 'телефонный разговор' },
							{ id: 203, expression: 'электронная переписка' },
							{ id: 204, expression: 'отчёт' },
						],
						},
					},
					{
						expression: 'clarification',
						example: 'Could you provide |clarification| on this point?',
						translatedExample: 'Можете дать |уточнение| по этому пункту?',
						correctAnswerId: 205,
						answerOptions: {
						create: [
							{ id: 205, expression: 'уточнение' },
							{ id: 206, expression: 'отказ' },
							{ id: 207, expression: 'компенсация' },
							{ id: 208, expression: 'напоминание' },
						],
						},
					},
					{
						expression: 'notification',
						example: 'You will receive a |notification| when the status changes.',
						translatedExample: 'Вы получите |уведомление|, когда статус изменится.',
						correctAnswerId: 212,
						answerOptions: {
						create: [
							{ id: 209, expression: 'претензия' },
							{ id: 210, expression: 'вложение' },
							{ id: 211, expression: 'перенос сроков' },
							{ id: 212, expression: 'уведомление' },
						],
						},
					},
					{
						expression: 'status update',
						example: 'Please send a |status update| by the end of the day.',
						translatedExample: 'Пожалуйста, отправьте |обновление статуса| до конца дня.',
						correctAnswerId: 214,
						answerOptions: {
						create: [
							{ id: 213, expression: 'напоминание' },
							{ id: 214, expression: 'обновление статуса' },
							{ id: 215, expression: 'жалоба' },
							{ id: 216, expression: 'номер заявки' },
						],
						},
					},
					{
						expression: 'follow-up',
						example: 'I’m sending a |follow-up| to check if you saw my message.',
						translatedExample: 'Я отправляю |повторное письмо|, чтобы уточнить, видели ли вы моё сообщение.',
						correctAnswerId: 220,
						answerOptions: {
						create: [
							{ id: 217, expression: 'обновление' },
							{ id: 218, expression: 'проблема' },
							{ id: 219, expression: 'контактное лицо' },
							{ id: 220, expression: 'повторное письмо' },
						],
						},
					},
					{
						expression: 'reminder',
						example: 'This is a friendly |reminder| about our request.',
						translatedExample: 'Это дружеское |напоминание| по нашему обращению.',
						correctAnswerId: 221,
						answerOptions: {
						create: [
							{ id: 221, expression: 'напоминание' },
							{ id: 222, expression: 'уведомление' },
							{ id: 223, expression: 'отслеживание' },
							{ id: 224, expression: 'компенсация' },
						],
						},
					},
					{
						expression: 'update',
						example: 'Any |update| on the situation?',
						translatedExample: 'Есть ли |обновление| по ситуации?',
						correctAnswerId: 227,
						answerOptions: {
						create: [
							{ id: 225, expression: 'просрочено' },
							{ id: 226, expression: 'задержка' },
							{ id: 227, expression: 'обновление' },
							{ id: 228, expression: 'вложение' },
						],
						},
					},
					{
						expression: 'delay',
						example: 'We are sorry for the |delay|.',
						translatedExample: 'Приносим извинения за |задержку|.',
						correctAnswerId: 232,
						answerOptions: {
						create: [
							{ id: 229, expression: 'координация' },
							{ id: 230, expression: 'жалоба' },
							{ id: 231, expression: 'срочно' },
							{ id: 232, expression: 'задержка' },
						],
						},
					},
					{
						expression: 'rescheduling',
						example: '|Rescheduling| is needed due to unexpected changes.',
						translatedExample: 'Нужен |перенос сроков| из-за непредвиденных изменений.',
						correctAnswerId: 234,
						answerOptions: {
						create: [
							{ id: 233, expression: 'претензия' },
							{ id: 234, expression: 'перенос сроков' },
							{ id: 235, expression: 'отслеживание' },
							{ id: 236, expression: 'уведомление' },
						],
						},
					},
					{
						expression: 'issue',
						example: 'There is an |issue| with the details provided.',
						translatedExample: 'Возникла |проблема| с предоставленными деталями.',
						correctAnswerId: 240,
						answerOptions: {
						create: [
							{ id: 237, expression: 'время ответа' },
							{ id: 238, expression: 'обновление статуса' },
							{ id: 239, expression: 'напоминание' },
							{ id: 240, expression: 'проблема' },
						],
						},
					},
					{
						expression: 'issue resolution',
						example: 'We are working on |issue resolution|.',
						translatedExample: 'Мы занимаемся |решением проблемы|.',
						correctAnswerId: 241,
						answerOptions: {
						create: [
							{ id: 241, expression: 'решение проблемы' },
							{ id: 242, expression: 'отслеживание' },
							{ id: 243, expression: 'номер заявки' },
							{ id: 244, expression: 'вложение' },
						],
						},
					},
					{
						expression: 'claim',
						example: 'We submitted a |claim| regarding the service quality.',
						translatedExample: 'Мы подали |претензию| по качеству сервиса.',
						correctAnswerId: 246,
						answerOptions: {
						create: [
							{ id: 245, expression: 'жалоба' },
							{ id: 246, expression: 'претензия' },
							{ id: 247, expression: 'уведомление' },
							{ id: 248, expression: 'контактное лицо' },
						],
						},
					},
					{
						expression: 'complaint',
						example: 'The client filed a |complaint|.',
						translatedExample: 'Клиент подал |жалобу|.',
						correctAnswerId: 252,
						answerOptions: {
						create: [
							{ id: 249, expression: 'перенос сроков' },
							{ id: 250, expression: 'претензия' },
							{ id: 251, expression: 'обновление' },
							{ id: 252, expression: 'жалоба' },
						],
						},
					},
					{
						expression: 'compensation',
						example: 'We can discuss |compensation| for the inconvenience.',
						translatedExample: 'Мы можем обсудить |компенсацию| за неудобства.',
						correctAnswerId: 253,
						answerOptions: {
						create: [
							{ id: 253, expression: 'компенсация' },
							{ id: 254, expression: 'уведомление' },
							{ id: 255, expression: 'вложение' },
							{ id: 256, expression: 'координация' },
						],
						},
					},
					{
						expression: 'tracking',
						example: '|Tracking| is available via the link.',
						translatedExample: '|Отслеживание| доступно по ссылке.',
						correctAnswerId: 258,
						answerOptions: {
						create: [
							{ id: 257, expression: 'просрочено' },
							{ id: 258, expression: 'отслеживание' },
							{ id: 259, expression: 'повторное письмо' },
							{ id: 260, expression: 'время ответа' },
						],
						},
					},
					{
						expression: 'reference number',
						example: 'Please include the |reference number| in your reply.',
						translatedExample: 'Пожалуйста, укажите |номер заявки| в ответе.',
						correctAnswerId: 264,
						answerOptions: {
						create: [
							{ id: 261, expression: 'контактное лицо' },
							{ id: 262, expression: 'вложение' },
							{ id: 263, expression: 'срочно' },
							{ id: 264, expression: 'номер заявки' },
						],
						},
					},
					{
						expression: 'response time',
						example: 'Our average |response time| is one business day.',
						translatedExample: 'Наше среднее |время ответа| — один рабочий день.',
						correctAnswerId: 265,
						answerOptions: {
						create: [
							{ id: 265, expression: 'время ответа' },
							{ id: 266, expression: 'обновление статуса' },
							{ id: 267, expression: 'претензия' },
							{ id: 268, expression: 'перенос сроков' },
						],
						},
					},
					{
						expression: 'coordination',
						example: 'Good |coordination| between teams is required.',
						translatedExample: 'Нужна хорошая |координация| между командами.',
						correctAnswerId: 272,
						answerOptions: {
						create: [
							{ id: 269, expression: 'жалоба' },
							{ id: 270, expression: 'вложение' },
							{ id: 271, expression: 'обновление' },
							{ id: 272, expression: 'координация' },
						],
						},
					},
					{
						expression: 'ETA',
						example: 'What is the |ETA| for the next step?',
						translatedExample: 'Какой |ожидаемый срок| для следующего этапа?',
						correctAnswerId: 274,
						answerOptions: {
						create: [
							{ id: 273, expression: 'просрочено' },
							{ id: 274, expression: 'ожидаемый срок' },
							{ id: 275, expression: 'номер заявки' },
							{ id: 276, expression: 'контактное лицо' },
						],
						},
					},
					{
						expression: 'pending',
						example: 'The request is still |pending|.',
						translatedExample: 'Запрос всё ещё |на рассмотрении|.',
						correctAnswerId: 280,
						answerOptions: {
						create: [
							{ id: 277, expression: 'срочно' },
							{ id: 278, expression: 'просрочено' },
							{ id: 279, expression: 'решено' },
							{ id: 280, expression: 'на рассмотрении' },
						],
						},
					},
					{
						expression: 'overdue',
						example: 'This item is |overdue|.',
						translatedExample: 'Этот пункт |просрочен|.',
						correctAnswerId: 281,
						answerOptions: {
						create: [
							{ id: 281, expression: 'просрочено' },
							{ id: 282, expression: 'на рассмотрении' },
							{ id: 283, expression: 'во вложении' },
							{ id: 284, expression: 'контактное лицо' },
						],
						},
					},
					{
						expression: 'urgent',
						example: 'This is |urgent|. Please reply today.',
						translatedExample: 'Это |срочно|. Пожалуйста, ответьте сегодня.',
						correctAnswerId: 288,
						answerOptions: {
						create: [
							{ id: 285, expression: 'напоминание' },
							{ id: 286, expression: 'обновление статуса' },
							{ id: 287, expression: 'на рассмотрении' },
							{ id: 288, expression: 'срочно' },
						],
						},
					},
					{
						expression: 'ASAP',
						example: 'Please respond |ASAP|.',
						translatedExample: 'Пожалуйста, ответьте |как можно скорее|.',
						correctAnswerId: 290,
						answerOptions: {
						create: [
							{ id: 289, expression: 'просрочено' },
							{ id: 290, expression: 'как можно скорее' },
							{ id: 291, expression: 'компенсация' },
							{ id: 292, expression: 'координация' },
						],
						},
					},
					{
						expression: 'attachment',
						example: 'The file is in the |attachment|.',
						translatedExample: 'Файл находится во |вложении|.',
						correctAnswerId: 296,
						answerOptions: {
						create: [
							{ id: 293, expression: 'уведомление' },
							{ id: 294, expression: 'номер заявки' },
							{ id: 295, expression: 'время ответа' },
							{ id: 296, expression: 'вложение' },
						],
						},
					},
					{
						expression: 'point of contact (POC)',
						example: 'Who is the |POC| for this topic?',
						translatedExample: 'Кто является |контактным лицом| по этому вопросу?',
						correctAnswerId: 297,
						answerOptions: {
						create: [
							{ id: 297, expression: 'контактное лицо' },
							{ id: 298, expression: 'обновление' },
							{ id: 299, expression: 'напоминание' },
							{ id: 300, expression: 'проблема' },
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
				name: 'Деловые фразы',
				exerciseType: { connect: { id: EXERCISES_TYPE.PHRASES } },
				imgSrc: '/assets/img/book.svg',
				expressions: {
					create: [
					{
						expression: 'Thank you for your message',
						example: '|Thank you for your message|, Yana.',
						translatedExample: '|Спасибо за Ваше сообщение|, Яна.',
						description: 'Вежливый ответ в начале переписки.',

						correctAnswerId: 1000,

						answerOptions: {
						create: [
							{ id: 1000, expression: 'Спасибо за Ваше сообщение' },
							{ id: 1001, expression: 'Пожалуйста, проверьте это' },
							{ id: 1002, expression: 'Я проверю это' },
							{ id: 1003, expression: 'Нам нужно больше времени' },
						],
						},
					},
					{
						expression: 'Please confirm this',
						example: '|Please confirm this| by email.',
						translatedExample: '|Пожалуйста, подтвердите это| по электронной почте.',
						description: 'Просьба подтвердить информацию или решение.',

						correctAnswerId: 1004,

						answerOptions: {
						create: [
							{ id: 1004, expression: 'Пожалуйста, подтвердите это' },
							{ id: 1005, expression: 'Спасибо за Ваше время' },
							{ id: 1006, expression: 'Я отправлю это сегодня' },
							{ id: 1007, expression: 'Мне это подходит' },
						],
						},
					},
					{
						expression: 'I will check this',
						example: '|I will check this| and reply today.',
						translatedExample: '|Я проверю это| и отвечу сегодня.',
						description: 'Сообщить, что Вы проверите информацию.',

						correctAnswerId: 1008,

						answerOptions: {
						create: [
							{ id: 1008, expression: 'Я проверю это' },
							{ id: 1009, expression: 'Пожалуйста, отправьте файл' },
							{ id: 1010, expression: 'Мы готовы начать' },
							{ id: 1011, expression: 'Это Вам подходит?' },
						],
						},
					},
					{
						expression: 'Is this OK for you',
						example: '|Is this OK for you| to meet tomorrow?',
						translatedExample: '|Это Вам подходит| встретиться завтра?',
						description: 'Уточнить, подходит ли предложение.',

						correctAnswerId: 1012,

						answerOptions: {
						create: [
							{ id: 1012, expression: 'Это Вам подходит?' },
							{ id: 1013, expression: 'Пожалуйста, проверьте это' },
							{ id: 1014, expression: 'Я понимаю Вашу точку зрения' },
							{ id: 1015, expression: 'Срок — завтра' },
						],
						},
					},
					{
						expression: 'Looking forward to your reply',
						example: 'I sincerely|looking forward to your reply|.',
						translatedExample: 'Я искренне |с нетерпением жду Вашего ответа|.',
						description: 'Вежливое завершение письма.',

						correctAnswerId: 1016,

						answerOptions: {
						create: [
							{ id: 1016, expression: 'С нетерпением жду Вашего ответа' },
							{ id: 1017, expression: 'Спасибо за Ваше сообщение' },
							{ id: 1018, expression: 'Мы можем это сделать' },
							{ id: 1019, expression: 'Пожалуйста, отправьте файл' },
						],
						},
					},
					{
						expression: 'Thank you for getting back to me',
						example: 'i have to go, but |thank you for getting back to me|.',
						translatedExample: 'Мне нужно идти, но |спасибо, что Вы ответили|.',
						description: 'Вежливая благодарность за ответ.',

						correctAnswerId: 1020,

						answerOptions: {
						create: [
							{ id: 1021, expression: 'Пожалуйста, уточните детали' },
							{ id: 1020, expression: 'Спасибо, что Вы ответили' },
							{ id: 1022, expression: 'Давайте назначим созвон' },
							{ id: 1023, expression: 'Я проверю и вернусь' },
						],
						},
					},
					{
						expression: 'Thank you for the quick reply',
						example: '|Thanks for the quick reply| to my message.',
						translatedExample: '|Спасибо за быстрый ответ| на мое сообщение.',
						description: 'Поблагодарить за оперативность.',

						correctAnswerId: 1024,

						answerOptions: {
						create: [
							{ id: 1025, expression: 'Я уточню и сообщу' },
							{ id: 1026, expression: 'Пришлите, пожалуйста, файл' },
							{ id: 1024, expression: 'Спасибо за быстрый ответ' },
							{ id: 1027, expression: 'Это Вам подходит?' },
						],
						},
					},
					{
						expression: 'I appreciate your help',
						example: '|I appreciate your help| with this.',
						translatedExample: '|Благодарю Вас за помощь| в этом.',
						description: 'Выразить благодарность за помощь.',

						correctAnswerId: 1028,

						answerOptions: {
						create: [
							{ id: 1029, expression: 'Пожалуйста, проверьте это' },
							{ id: 1030, expression: 'Нам нужно больше времени' },
							{ id: 1031, expression: 'Давайте обсудим это позже' },
							{ id: 1028, expression: 'Благодарю Вас за помощь' },
						],
						},
					},
					{
						expression: 'Please let me know',
						example: '|Please let me know| if you have any questions.',
						translatedExample: '|Пожалуйста, сообщите мне|, если у Вас будут вопросы.',
						description: 'Попросить написать, если появятся вопросы.',

						correctAnswerId: 1032,

						answerOptions: {
						create: [
							{ id: 1033, expression: 'Мы готовы начать' },
							{ id: 1034, expression: 'Я отправлю это сегодня' },
							{ id: 1032, expression: 'Пожалуйста, сообщите мне' },
							{ id: 1035, expression: 'Давайте перейдём к следующему шагу' },
						],
						},
					},
					{
						expression: 'I will pass this information on',
						example: '|I will pass this information on| to my management.',
						translatedExample: '|Я передам информацию| своему руководству.',
						description: 'Вежливое завершение письма, ожидание ответа.',

						correctAnswerId: 1036,

						answerOptions: {
						create: [
							{ id: 1037, expression: 'Пожалуйста, подтвердите это' },
							{ id: 1038, expression: 'Давайте запланируем встречу' },
							{ id: 1039, expression: 'Я отправлю Вам' },
							{ id: 1036, expression: 'Я передам информацию' },
						],
						},
					},

					{
						expression: 'I have sent the file',
						example: '|I have sent the file|.',
						translatedExample: '|Я уже отправил(а) файл|.',
						description:
						'Present Perfect: действие произошло недавно, результат важен сейчас (файл уже отправлен).',

						correctAnswerId: 1040,

						answerOptions: {
						create: [
							{ id: 1041, expression: 'Пожалуйста, проверьте вложение' },
							{ id: 1042, expression: 'Мы рассмотрим это завтра' },
							{ id: 1040, expression: 'Я уже отправил(а) файл' },
							{ id: 1043, expression: 'Вам удобно сегодня созвониться?' },
						],
						},
					},
					{
						expression: 'I have attached the document',
						example: '|I have attached the document|.',
						translatedExample: '|Я прикрепил(а) документ|.',
						description:
						'Present Perfect: действие произошло недавно, результат важен сейчас (документ уже прикреплён).',

						correctAnswerId: 1044,

						answerOptions: {
						create: [
							{ id: 1045, expression: 'Пожалуйста, подтвердите получение' },
							{ id: 1046, expression: 'Давайте обсудим это на встрече' },
							{ id: 1047, expression: 'Мне нужно больше информации' },
							{ id: 1044, expression: 'Я прикрепил(а) документ' },
						],
						},
					},
					{
						expression: 'Please find the file attached',
						example: '|Please find the file attached|.',
						translatedExample: '|Файл во вложении|.',
						description: 'Сообщить, что файл приложен.',

						correctAnswerId: 1048,

						answerOptions: {
						create: [
							{ id: 1049, expression: 'Пожалуйста, посмотрите вложение' },
							{ id: 1050, expression: 'Мы работаем над этим' },
							{ id: 1048, expression: 'Файл во вложении' },
							{ id: 1051, expression: 'Давайте уточним детали' },
						],
						},
					},
					{
						expression: 'Could you please check this',
						example: '|Could you please check this|?',
						translatedExample: '|Не могли бы Вы это проверить|?',
						description: 'Вежливая просьба проверить.',

						correctAnswerId: 1052,

						answerOptions: {
						create: [
							{ id: 1053, expression: 'Нам нужно больше времени' },
							{ id: 1052, expression: 'Не могли бы Вы это проверить' },
							{ id: 1054, expression: 'Я вернусь к Вам позже' },
							{ id: 1055, expression: 'Давайте назначим встречу' },
						],
						},
					},
					{
						expression: 'I need to clarify',
						example: '|I need to clarify| this with my colleagues',
						translatedExample: '|Мне нужно уточнить это| у моих коллег',
						description: 'Попросить подтвердить, подходит ли вариант.',

						correctAnswerId: 1056,

						answerOptions: {
						create: [
							{ id: 1057, expression: 'Мне нужно перепроверить' },
							{ id: 1058, expression: 'Пожалуйста, отправьте файл' },
							{ id: 1059, expression: 'Я проверю и отвечу' },
							{ id: 1056, expression: 'Мне нужно уточнить' },
						],
						},
					},
					{
						expression: 'I need more information',
						example: '|I need more information| about this.',
						translatedExample: '|Мне нужна дополнительная информация| по этому вопросу.',
						description: 'Сказать, что требуется больше данных.',

						correctAnswerId: 1060,

						answerOptions: {
						create: [
							{ id: 1061, expression: 'Давайте уточним детали' },
							{ id: 1062, expression: 'Мы готовы продолжать' },
							{ id: 1060, expression: 'Мне нужна дополнительная информация' },
							{ id: 1063, expression: 'Спасибо за быстрый ответ' },
						],
						},
					},
					{
						expression: 'Let’s schedule a meeting',
						example: '|Let’s schedule a meeting| for tommorow.',
						translatedExample: '|Давайте запланируем встречу| на завтра.',
						description: 'Предложить назначить встречу.',

						correctAnswerId: 1064,

						answerOptions: {
						create: [
							{ id: 1065, expression: 'Пожалуйста, подтвердите дату' },
							{ id: 1066, expression: 'Я отправлю повестку' },
							{ id: 1067, expression: 'Мы обсудим это позже' },
							{ id: 1064, expression: 'Давайте запланируем встречу' },
						],
						},
					},
					{
						expression: 'Are you available tomorrow',
						example: '|Are you available tomorrow|?',
						translatedExample: '|Вы свободны завтра|?',
						description: 'Уточнить доступность на завтра.',

						correctAnswerId: 1068,

						answerOptions: {
						create: [
							{ id: 1069, expression: 'Вам удобно в 15:00?' },
							{ id: 1070, expression: 'Я уточню и отвечу' },
							{ id: 1068, expression: 'Вы свободны завтра' },
							{ id: 1071, expression: 'Пожалуйста, пришлите обновление' },
						],
						},
					},
					{
						expression: 'Can we meet',
						example: '|Can we meet| at 3 p.m. in the meeting room?',
						translatedExample: '|Можем ли мы встретиться| в 15:00 в конференц-зале?',
						description: 'Предложить встречу позже сегодня.',

						correctAnswerId: 1072,

						answerOptions: {
						create: [
							{ id: 1073, expression: 'Давайте созвонимся позже' },
							{ id: 1074, expression: 'Пожалуйста, проверьте это' },
							{ id: 1075, expression: 'Я отправлю это сегодня' },
							{ id: 1072, expression: 'Можем ли мы встретиться' },
						],
						},
					},
					{
						expression: 'Please let me know a good time',
						example: '|Please let me know a good time| for you.',
						translatedExample: '|Подскажите, пожалуйста, удобное время| для Вас.',
						description: 'Попросить предложить удобное время.',

						correctAnswerId: 1076,

						answerOptions: {
						create: [
							{ id: 1077, expression: 'Вам подходит завтра утром?' },
							{ id: 1078, expression: 'Мы согласны с этим' },
							{ id: 1076, expression: 'Подскажите, пожалуйста, удобное время' },
							{ id: 1079, expression: 'Спасибо за Ваше сообщение' },
						],
						},
					},
					{
						expression: 'The meeting is scheduled for tomorrow',
						example: '|The meeting is scheduled for tomorrow|.',
						translatedExample: '|Встреча назначена на завтра|.',
						description: 'Сообщить о назначенной встрече.',

						correctAnswerId: 1080,

						answerOptions: {
						create: [
							{ id: 1081, expression: 'Пожалуйста, подтвердите участие' },
							{ id: 1080, expression: 'Встреча назначена на завтра' },
							{ id: 1082, expression: 'Давайте обсудим повестку' },
							{ id: 1083, expression: 'Я пришлю ссылку на звонок' },
						],
						},
					},
					{
						expression: 'I will follow up on this',
						example: '|I will follow up on this| tomorrow.',
						translatedExample: '|Я вернусь к этому вопросу| завтра.',
						description: 'Пообещать вернуться к теме позже.',

						correctAnswerId: 1084,

						answerOptions: {
						create: [
							{ id: 1085, expression: 'Я уточню и напишу Вам' },
							{ id: 1086, expression: 'Нам нужно согласование' },
							{ id: 1087, expression: 'Пожалуйста, отправьте детали' },
							{ id: 1084, expression: 'Я вернусь к этому вопросу' },
						],
						},
					},
					{
						expression: 'We are working on this',
						example: '|We are working on this| now.',
						translatedExample: '|Мы работаем над этим| сейчас.',
						description: 'Сообщить, что задача в работе.',

						correctAnswerId: 1088,

						answerOptions: {
						create: [
							{ id: 1089, expression: 'Мы уже начали работу' },
							{ id: 1090, expression: 'Пожалуйста, уточните требование' },
							{ id: 1088, expression: 'Мы работаем над этим' },
							{ id: 1091, expression: 'Мы сообщим о результате' },
						],
						},
					},
					{
						expression: 'This needs further review',
						example: '|This needs further review|.',
						translatedExample: '|Это нужно дополнительно проверить|.',
						description: 'Сказать, что требуется дополнительная проверка.',

						correctAnswerId: 1092,

						answerOptions: {
						create: [
							{ id: 1093, expression: 'Это нужно согласовать' },
							{ id: 1094, expression: 'Это уже готово' },
							{ id: 1095, expression: 'Давайте обсудим позже' },
							{ id: 1092, expression: 'Это нужно дополнительно проверить' },
						],
						},
					},
					{
						expression: 'Let’s move to the next step',
						example: '|Let’s move to the next step|.',
						translatedExample: '|Давайте перейдём к следующему шагу|.',
						description: 'Перейти к следующему этапу.',

						correctAnswerId: 1096,

						answerOptions: {
						create: [
							{ id: 1097, expression: 'Давайте уточним сроки' },
							{ id: 1096, expression: 'Давайте перейдём к следующему шагу' },
							{ id: 1098, expression: 'Пожалуйста, подтвердите детали' },
							{ id: 1099, expression: 'Я отправлю резюме встречи' },
						],
						},
					},
					{
						expression: 'We will discuss this later',
						example: '|We will discuss this later|.',
						translatedExample: '|Мы обсудим это позже|.',
						description: 'Отложить обсуждение на позже.',

						correctAnswerId: 1100,

						answerOptions: {
						create: [
							{ id: 1101, expression: 'Сейчас это не приоритет' },
							{ id: 1102, expression: 'Давайте обсудим это сейчас' },
							{ id: 1100, expression: 'Мы обсудим это позже' },
							{ id: 1103, expression: 'Я вернусь к Вам с ответом' },
						],
						},
					},
					{
						expression: 'This sounds good to me',
						example: '|This sounds good to me|.',
						translatedExample: '|Мне это подходит|.',
						description: 'Выразить согласие с предложением.',

						correctAnswerId: 1104,

						answerOptions: {
						create: [
							{ id: 1105, expression: 'Я не уверен(а) в этом' },
							{ id: 1106, expression: 'Нам нужно время подумать' },
							{ id: 1107, expression: 'Давайте уточним детали' },
							{ id: 1104, expression: 'Мне это подходит' },
						],
						},
					},
					{
						expression: 'I agree with your point',
						example: '|I agree| with your point.',
						translatedExample: '|Я согласен(а)| с Вашей точкой зрения.',
						description: 'Согласиться с мнением собеседника.',

						correctAnswerId: 1108,

						answerOptions: {
						create: [
							{ id: 1109, expression: 'Я не согласен(а)' },
							{ id: 1108, expression: 'Я согласен(а)' },
							{ id: 1110, expression: 'Мне нужно уточнить' },
							{ id: 1111, expression: 'Давайте обсудим позже' },
						],
						},
					},
					{
						expression: 'I understand your concern',
						example: '|I understand your concern|.',
						translatedExample: '|Я понимаю Ваши опасения|.',
						description: 'Показать, что Вы понимаете беспокойство собеседника.',

						correctAnswerId: 1112,

						answerOptions: {
						create: [
							{ id: 1113, expression: 'Я не понимаю' },
							{ id: 1114, expression: 'Это не важно' },
							{ id: 1112, expression: 'Я понимаю Ваши опасения' },
							{ id: 1115, expression: 'Давайте продолжим' },
						],
						},
					},
					{
						expression: 'That makes sense',
						example: '|That makes sense|.',
						translatedExample: '|Это логично|.',
						description: 'Сказать, что аргумент понятен и убедителен.',

						correctAnswerId: 1116,

						answerOptions: {
						create: [
							{ id: 1117, expression: 'Это странно' },
							{ id: 1118, expression: 'Я не уверен(а)' },
							{ id: 1119, expression: 'Давайте уточним' },
							{ id: 1116, expression: 'Это логично' },
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
