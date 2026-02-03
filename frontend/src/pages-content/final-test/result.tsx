import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { ITestExpression } from '@/pages-content/final-test/types/questions';

/** Проходной процент */
export const PASS_PERCENT = 85;

type TestResultContentProps = {
	testResult: ITestExpression[];
	onRetake?: () => void;
};

/** Маленький UI-блок */
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
	className,
	children,
}) => (
	<div
		className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}
	>
		{children}
	</div>
);

export function WrongAnswerItem({
	expression,
	className,
}: {
	expression: ITestExpression;
	className?: string;
}) {
	return (
		<div className={cn('py-5', className)}>
			<div className="flex items-start gap-3">
				<span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
					{expression.index}
				</span>

				<div className="min-w-0">
					<div className="text-slate-900">{expression.question}</div>

					<div className="mt-2 text-rose-700">
						<span className="font-semibold">Ваш ответ:</span> {expression.answer}
					</div>

					<div className="mt-2 text-emerald-700">
						<span className="font-semibold">Правильный ответ:</span>{' '}
						{expression.correctAnswer}
					</div>
				</div>
			</div>
		</div>
	);
}

export function TestResultContent({ testResult, onRetake }: TestResultContentProps) {
	const total = testResult.length;

	const correctCount = testResult.filter((x) => x.isCorrectAnswer).length;

	const wrongCount = total - correctCount;

	const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

	const passed = percent >= PASS_PERCENT;

	const visibleList = testResult.filter((x) => !x.isCorrectAnswer); // в fail — только ошибки

	return (
		<div className="space-y-6">
			{/* Верхушка (только фон + сообщение) */}
			<Card className="overflow-hidden">
				<div className={cn('px-8 py-8', passed ? 'bg-emerald-50' : 'bg-rose-50')}>
					<div className="flex items-start justify-between gap-6">
						<div className="flex items-start gap-5">
							<Image
								src={`/assets/img/${passed ? 'success' : 'error'}.svg`}
								alt={'IMG:' + passed ? 'success' : 'error'}
								width={48}
								height={48}
							/>

							<div>
								<h2 className="text-2xl font-semibold text-slate-900">
									{passed ? 'Успешная попытка' : 'Неудачная попытка'}
								</h2>

								<p className="mt-1 text-slate-600">
									{passed
										? 'Вы прошли финальный тест!'
										: 'К сожалению, вы не прошли финальный тест'}
								</p>
							</div>
						</div>

						<span
							className={cn(
								'inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white',
								passed ? 'bg-emerald-600' : 'bg-rose-600'
							)}
						>
							{passed ? 'Тест пройден' : 'Тест не пройден'}
						</span>
					</div>

					<Card className="mt-6">
						<div className="px-7 py-6">
							<div className="text-slate-700 flex items-baseline gap-3">
								Результат:
								<span className="text-slate-900">
									<b className="text-2xl text-emerald-700">{correctCount}</b>
									<span className="text-lg font-semibold">/{total}</span>{' '}
									<span className="text-lg">правильных ответов</span>
								</span>
							</div>

							<div className="mt-4 h-px w-full bg-slate-200" />

							<div className="mt-3 flex flex-wrap items-center gap-4">
								<div className="inline-flex items-center gap-2 text-emerald-700">
									<span className="h-2 w-2 rounded-full bg-emerald-600" />
									<span>
										<b>{correctCount}</b> правильных
									</span>
								</div>

								<div className="inline-flex items-center gap-2 text-rose-700">
									<span className="h-2 w-2 rounded-full bg-rose-600" />
									<span>
										<b>{wrongCount}</b> неправильных
									</span>
								</div>

								<div className="h-4 w-px bg-slate-200" />

								<div className="text-slate-900">
									<b>{percent}%</b>
								</div>
							</div>

							{!passed && (
								<div className="mt-4 flex items-center gap-3 rounded-xl bg-white/60 px-4 py-3 text-sm text-slate-700">
									<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-800">
										!
									</span>
									<div>
										Чтобы сдать тест, нужно больше <b>{PASS_PERCENT}%</b> правильных
										ответов
									</div>
								</div>
							)}
						</div>
					</Card>
				</div>
			</Card>

			{/* Список */}
			{!!visibleList.length && (
				<Card>
					<div className="px-7 py-6">
						<h3 className="text-xl font-semibold text-slate-900">Ошибки</h3>

						<div className="mt-2 divide-y divide-slate-200">
							{visibleList.map((x) => (
								<WrongAnswerItem key={x.index} expression={x} />
							))}
						</div>

						{/* Низ карточки */}
					</div>
				</Card>
			)}
			<div className="mt-6 flex flex-col items-end gap-3">
				<button
					type="button"
					onClick={onRetake}
					className="cursor-pointer inline-flex h-12 items-center justify-center rounded-xl bg-emerald-700 px-10 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
				>
					Пройти тест заново
				</button>
			</div>
		</div>
	);
}
