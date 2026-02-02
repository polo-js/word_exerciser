import { IExerciseExpressions } from '@/pages-content/exercises/types/exercises';
import { IoIosArrowBack } from 'react-icons/io';
import { useMemo, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { WordCard } from '@/shared/ui/word-card';
import { renderBoldFromPipes } from '@/shared/utils/print';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { Checkbox, Label } from 'radix-ui';
import { FaCheck } from 'react-icons/fa';
import { exerciseService } from '@/pages-content/exercises/exercise.service';
import { EXERCISE_TYPE } from '@/const';

interface IExpressionsCardProps {
	expressions: IExerciseExpressions[];
	selectedExercise: string;
	onBackToCategoryClick: () => void;
	type: EXERCISE_TYPE;
}

export function ExpressionsCard({
	expressions,
	selectedExercise,
	onBackToCategoryClick,
	type,
}: IExpressionsCardProps) {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [chosenExpressionId, setChosenExpressionId] = useState<number | null>(null);
	const [checked, setChecked] = useState<boolean>(false);

	const currentIndex = currentStep - 1;
	const isLastStep = currentIndex === expressions.length - 1;

	const currentExpression = expressions[currentIndex];
	const { correctAnswerId, answerOptions } = currentExpression;

	const isChosenCorrectAnswer =
		chosenExpressionId !== null && correctAnswerId === chosenExpressionId;
	const isChosenAnswer = chosenExpressionId !== null;

	// ✅ Для “Правильный ответ: …” (показываем только если пользователь ошибся)
	const correctOption = useMemo(() => {
		return answerOptions.find((o) => o.id === correctAnswerId);
	}, [answerOptions, correctAnswerId]);

	const onExpressionClickHandler = (id: number) => {
		if (chosenExpressionId !== null) {
			return;
		}

		setChosenExpressionId(id);
	};

	const onNextCardClickHandler = () => {
		if (chosenExpressionId === null) {
			return;
		}

		if (isLastStep) {
			onBackToCategoryClick();
			return;
		}

		setCurrentStep(currentStep + 1);
		setChosenExpressionId(null);
		setChecked(false);
	};

	const onCheckedChangeHandler = (checked: boolean) => {
		setChecked(checked);

		if (checked) {
			void exerciseService.addExerciseProgress(currentExpression.id);
		} else {
			void exerciseService.deleteExerciseProgress(currentExpression.id);
		}
	};

	return (
		<div className="w-full px-2 py-2 md:px-6 md:py-6">
			{/* Header */}
			<div className="flex items-center justify-between gap-4 min-h-[44px]">
				<div
					onClick={onBackToCategoryClick}
					className={cn(
						'flex items-center gap-3',
						'cursor-pointer select-none',
						'text-gray-600 hover:text-gray-900 transition-colors'
					)}
				>
					<IoIosArrowBack size={22} />
					<div className="text-base md:text-lg font-medium">{selectedExercise}</div>
					<div className="text-base md:text-lg text-gray-500">{`${currentStep} / ${expressions.length}`}</div>
				</div>

				{/* "Выучено" — показываем только при правильном ответе (логика прежняя) */}
				{isChosenCorrectAnswer && (
					<Checkbox.Root
						className={cn(
							'inline-flex items-center gap-3',
							'bg-white',
							'px-3 py-2 rounded-xl',
							'ring-1 ring-black/10 shadow-sm',
							'cursor-pointer select-none',
							'hover:bg-zinc-50 transition-colors'
						)}
						id={String(currentIndex)}
						onCheckedChange={onCheckedChangeHandler}
						checked={checked}
					>
						<div
							className={cn(
								'transition-colors',
								checked ? 'bg-emerald-500' : 'bg-white',
								'ring-1 ring-black/10',
								'w-[22px] h-[22px] rounded-md',
								'flex items-center justify-center'
							)}
						>
							<Checkbox.Indicator className={cn('text-white')}>
								<FaCheck size={14} />
							</Checkbox.Indicator>
						</div>

						<Label.Root
							className="cursor-pointer text-sm font-medium text-gray-800"
							htmlFor={String(currentIndex)}
						>
							Выучено
						</Label.Root>
					</Checkbox.Root>
				)}
			</div>

			{/* Body */}
			<div className="flex flex-col mt-8">
				<div className="flex gap-3 items-center">
					<div className="h-11 w-11 rounded-full bg-amber-50 ring-1 ring-amber-100 flex items-center justify-center">
						<Image src="/assets/img/bulb.svg" alt="IMG: Bulb" width={24} height={24} />
					</div>
					<div className="text-2xl md:text-3xl font-semibold text-gray-900">Question</div>
				</div>

				<div className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mt-6">
					{type === EXERCISE_TYPE.TERMS
						? 'Какой термин правильный?'
						: 'Какая фраза правильная?'}
				</div>

				<div className="mt-6">
					<WordCard className="mb-6">{currentExpression.expression}</WordCard>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{answerOptions.map((option) => (
							<WordCard
								className="cursor-pointer"
								// ✅ Меняем поведение подсветки:
								// После ответа подсвечиваем ТОЛЬКО выбранный вариант.
								// - если выбран правильный → true
								// - если выбран неправильный → false
								// Остальные — нейтральные.
								isCorrectAnswer={
									!isChosenAnswer
										? void 0
										: chosenExpressionId === option.id
											? correctAnswerId === option.id
											: void 0
								}
								onClick={() => {
									onExpressionClickHandler(option.id);
								}}
								key={option.id}
							>
								{option.expression}
							</WordCard>
						))}
					</div>
				</div>

				{/* Result banner */}
				<div
					className={cn(
						'mt-5 rounded-xl px-4 py-3',
						'flex items-start gap-3',
						isChosenAnswer ? 'bg-zinc-50 ring-1 ring-black/5' : 'bg-transparent',
						isChosenAnswer ? 'min-h-[56px]' : 'min-h-[0px]'
					)}
				>
					{isChosenAnswer && (
						<>
							<Image
								src={`/assets/img/${isChosenCorrectAnswer ? 'success' : 'error'}.svg`}
								alt="IMG: Result"
								width={42}
								height={42}
								className="w-[42px] h-[42px]"
							/>

							<div className="flex flex-col gap-1">
								<div
									className={cn(
										'text-lg md:text-xl font-semibold',
										isChosenCorrectAnswer ? 'text-emerald-700' : 'text-rose-700'
									)}
								>
									{isChosenCorrectAnswer ? 'Правильно!' : 'Неправильно!'}
								</div>

								{/* ✅ Если ответ неверный — спокойно показываем правильный ответ текстом */}
								{!isChosenCorrectAnswer && correctOption && (
									<div className="text-sm md:text-base text-gray-600">
										Правильный ответ:{' '}
										<span className="font-semibold text-gray-900">
											{correctOption.expression}
										</span>
									</div>
								)}
							</div>
						</>
					)}
				</div>

				{/* ✅ Пример/перевод показываем ТОЛЬКО после выбора ответа */}
				{isChosenAnswer && (
					<div className="mt-6 flex flex-col gap-5">
						<div className="text-xl md:text-2xl leading-snug">
							<span className="text-gray-500">Пример: </span>
							<span className="text-gray-800">
								{renderBoldFromPipes(currentExpression.example)}
							</span>
						</div>

						<div className="text-xl md:text-2xl leading-snug text-gray-800">
							{renderBoldFromPipes(currentExpression.translatedExample)}
						</div>
					</div>
				)}

				{/* Footer */}
				<div className="flex justify-end items-center mt-8">
					<button
						onClick={onNextCardClickHandler}
						className={cn(
							'inline-flex items-center gap-2',
							'py-3 px-6 rounded-xl',
							'uppercase font-bold text-sm tracking-wide',
							'transition-all duration-200',
							isChosenAnswer
								? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 active:scale-[0.99]'
								: 'bg-zinc-200 text-zinc-400'
						)}
					>
						<span>{isLastStep ? 'Закончить' : 'Далее'}</span>
						<LiaAngleRightSolid size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
