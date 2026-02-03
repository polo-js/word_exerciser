import * as React from 'react';
import { IQuestionBlock, ITestExpression } from './types/questions';
import { QuestionBlock } from './question-block';
import { memo, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
	expressions: IQuestionBlock[];
	onSubmit: (results: ITestExpression[]) => void;
};

const MOCK_EXERCISES: IQuestionBlock[] = [
	{
		id: 1,
		index: 1,
		expression: 'Who is the end user in a procurement context?',
		correctAnswerId: 101,
		answerOptions: [
			{ id: 101, expression: 'Primary customer or department using the product' },
			{ id: 102, expression: 'Supplier manufacturing the product' },
			{ id: 103, expression: 'Person or company making the purchase' },
			{ id: 104, expression: 'Logistics coordinator handling the shipment' },
		],
	},
	{
		id: 2,
		index: 0,
		expression: 'Select the meaning of the phrase "to negotiate terms of a contract"',
		correctAnswerId: 202,
		answerOptions: [
			{ id: 201, expression: 'To review product specifications' },
			{ id: 202, expression: 'To discuss the conditions of an agreement' },
			{ id: 203, expression: 'To carry out a market analysis' },
			{ id: 204, expression: 'To manage payment processes' },
		],
	},
];

function TestMainComp({ expressions = MOCK_EXERCISES, onSubmit }: Props) {
	useEffect(() => {
		console.log('update');
		console.log(expressions);
	}, [expressions]);

	const [selectedByQuestionId, setSelectedByQuestionId] = React.useState<
		Record<number, number | null>
	>(() => {
		return Object.fromEntries(expressions.map((item) => [item.id, null]));
	});

	const answeredCount = Object.values(selectedByQuestionId).filter(
		(answerId) => answerId != null
	).length;

	const handleSubmit = () => {
		const isAllAnswered =
			expressions.length ===
			Object.values(selectedByQuestionId).filter((v) => v !== null).length;

		if (!isAllAnswered) {
			toast.error('Необходимо ответить на все вопросы');
			return;
		}

		const result: ITestExpression[] = Object.entries(selectedByQuestionId)
			.map(([expressionId, selectedQuestionId]) => {
				const currentExpression = expressions.find(
					({ id }) => Number(expressionId) === id
				);
				if (!currentExpression) {
					console.error('Не найден expression');
					return null;
				}

				const answerObj = currentExpression.answerOptions.find(
					(answer) => answer.id === selectedQuestionId
				);
				const currentAnswerObj = currentExpression.answerOptions.find(
					(answer) => answer.id === currentExpression.correctAnswerId
				);
				if (!answerObj || !currentAnswerObj) {
					console.error('Не найден answer');
					return null;
				}

				return {
					index: currentExpression.index,
					question: currentExpression.expression,
					answer: answerObj.expression,
					correctAnswer: currentAnswerObj.expression,
					isCorrectAnswer: answerObj.id === currentExpression.correctAnswerId,
				};
			})
			.filter((item) => item !== null)
			.sort((a, b) => a.index - b.index);

		onSubmit(result);
	};

	return (
		<div className="w-full">
			{/* Top */}
			<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
				<div className="text-lg font-semibold text-slate-900">
					Final Test — {expressions.length} questions
				</div>

				<div className="text-sm font-medium text-slate-600">
					Answered: {answeredCount} / {expressions.length}
				</div>
			</div>

			{/* Middle (scrollable) */}
			<div className="rounded-2xl">
				<div className="space-y-4">
					{expressions.map((q) => (
						<QuestionBlock
							key={q.id}
							exercise={q}
							index={q.index}
							value={selectedByQuestionId[q.id] ?? null}
							onChange={(answerId) =>
								setSelectedByQuestionId((prev) => ({ ...prev, [q.id]: answerId }))
							}
						/>
					))}
				</div>
			</div>

			{/* Bottom */}
			<div className="mt-9 flex flex-col justify-center items-center">
				<button
					type="button"
					onClick={handleSubmit}
					className="cursor-pointer h-12 rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:translate-y-px disabled:opacity-50"
				>
					Submit test
				</button>
			</div>
		</div>
	);
}

export const TestMain = memo(TestMainComp);
