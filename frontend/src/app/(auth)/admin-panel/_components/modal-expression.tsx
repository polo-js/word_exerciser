import cn from 'classnames';
import { StyledInput } from '@/shared/ui/input';
import { RadioGroup } from 'radix-ui';
import { EXERCISE_TYPE } from '@/const';
import React from 'react';
import { FullFormatAnswerOption, FullFormatExpression } from './types/response';
import {
	CreateExercisesExpressionBody,
	UpdateExercisesExpressionBody,
} from '@/app/(auth)/admin-panel/_components/types/transfer';

export function AddCardModalContent(props: {
	defaultAnswersCount?: number; // e.g. 4
	type: EXERCISE_TYPE;
	expression?: FullFormatExpression;
	exerciseId: number;
	onCreate?: (expression: CreateExercisesExpressionBody) => void;
	onUpdate?: (id: number, expression: UpdateExercisesExpressionBody) => void;
}) {
	const {
		defaultAnswersCount = 4,
		onCreate,
		onUpdate,
		type,
		expression,
		exerciseId,
	} = props;
	const isTerms = type === EXERCISE_TYPE.TERMS;

	const [word, setWord] = React.useState(expression ? expression.expression : '');
	const [answers, setAnswers] = React.useState<string[]>(
		expression?.answerOptions
			? expression.answerOptions.map(({ expression }) => expression)
			: Array.from({ length: defaultAnswersCount }).map(() => '')
	);
	const [correctIndex, setCorrectIndex] = React.useState<string>(() => {
		if (expression) {
			const currentAnswerIndex = expression.answerOptions.findIndex(
				({ id }) => id === expression.correctAnswerId
			);

			if (currentAnswerIndex < 0) {
				throw new Error('Пиздец. Тут секс');
			}

			return String(currentAnswerIndex);
		}

		return '0';
	});
	const [exampleEn, setExampleEn] = React.useState(expression?.example || '');
	const [exampleRu, setExampleRu] = React.useState(expression?.translatedExample || '');

	return (
		<div className="w-full">
			{/* This is ONLY the inner content. Header/close/overlay are in your modal component. */}
			<div className="space-y-6">
				<StyledInput
					label={isTerms ? 'Термин' : 'Фраза'}
					placeholder=""
					value={word}
					onChange={(e) => setWord(e.target.value)}
				/>

				<div className="space-y-3">
					<div className="text-sm font-semibold text-slate-700">Варианты ответа</div>

					<RadioGroup.Root
						value={correctIndex}
						onValueChange={setCorrectIndex}
						className="space-y-3"
					>
						{answers.map((val, idx) => (
							<div key={idx} className="flex items-center gap-3">
								<RadioGroup.Item
									value={String(idx)}
									aria-label={`Выбрать вариант ${idx + 1} как правильный`}
									className={cn(
										'relative h-5 w-5 shrink-0 rounded-full border border-slate-300 bg-white',
										'outline-none',
										'focus:ring-2 focus:ring-slate-200'
									)}
								>
									<RadioGroup.Indicator
										className={cn(
											'absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-slate-700'
										)}
									/>
								</RadioGroup.Item>

								<StyledInput
									placeholder=""
									value={val}
									onChange={(e) => {
										const next = answers.slice();
										next[idx] = e.target.value;
										setAnswers(next);
									}}
									rootClassName="flex-1"
									inputClassName="h-12"
								/>
							</div>
						))}
					</RadioGroup.Root>
				</div>

				<div className="space-y-3">
					<div className="text-sm font-semibold text-slate-700">Пример</div>

					<StyledInput
						placeholder="Пример на английском"
						value={exampleEn}
						onChange={(e) => setExampleEn(e.target.value)}
					/>

					<StyledInput
						placeholder="Пример на русском"
						value={exampleRu}
						onChange={(e) => setExampleRu(e.target.value)}
					/>
				</div>

				{/* Footer actions inside content (если в твоей модалке есть общий footer — можешь убрать этот блок) */}
				<div className="flex items-center justify-end gap-3 pt-2">
					<button
						type="button"
						onClick={() => {
							debugger;
							if (expression) {
								onUpdate?.(expression.id, {
									expression: word,
									example: exampleEn,
									translatedExample: exampleRu,
									correctAnswerIndex: Number(correctIndex),
									answerOptions: answers,
								});
							} else {
								onCreate?.({
									expression: word,
									example: exampleEn,
									translatedExample: exampleRu,
									exercise: exerciseId,
									correctAnswerIndex: Number(correctIndex),
									answerOptions: answers,
								});
							}
						}}
						className={cn(
							'rounded-xl px-6 py-2.5 text-sm font-semibold text-white',
							'bg-emerald-700 hover:bg-emerald-800',
							'focus:outline-none focus:ring-2 focus:ring-emerald-300',
							'cursor-pointer'
						)}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
}
