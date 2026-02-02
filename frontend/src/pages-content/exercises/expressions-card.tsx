import { IExerciseExpressions } from '@/pages-content/exercises/types/exercises';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
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
		<div>
			<div className={cn('flex justify-between min-h-[41px]')}>
				<div
					onClick={onBackToCategoryClick}
					className={cn(
						'flex items-center justify-start',
						'text-gray-600',
						'cursor-pointer'
					)}
				>
					<IoIosArrowBack size={28} />
					<div className="text-xl flex items-center ml-4 mr-9">{selectedExercise}</div>
					<div className="flex items-center text-xl">{`${currentStep} / ${expressions.length}`}</div>
				</div>
				{isChosenCorrectAnswer && (
					<div>
						<Checkbox.Root
							className={cn(
								'bg-[#FBF9FC]',
								'p-2',
								'pr-4',
								'rounded',
								'flex items-center justify-center gap-2',
								'shadow--inner-border',
								'cursor-pointer',
								'hover:bg-[#F1EFF2]'
							)}
							id={String(currentIndex)}
							onCheckedChange={onCheckedChangeHandler}
							checked={checked}
						>
							<div
								className={cn(
									checked ? 'bg-emerald-400' : 'bg-white',
									'shadow--card-border',
									'w-[25px]',
									'h-[25px]',
									'rounded',
									'flex items-center justify-center'
								)}
							>
								<Checkbox.Indicator className={cn('text-white')}>
									<FaCheck />
								</Checkbox.Indicator>
							</div>
							<Label.Root className="cursor-pointer" htmlFor={String(currentIndex)}>
								Выучено
							</Label.Root>
						</Checkbox.Root>
					</div>
				)}
			</div>

			<div className="flex flex-col mt-6">
				<div className="flex gap-4 items-center">
					<Image src="/assets/img/bulb.svg" alt="IMG: Bulb" width={42} height={42} />
					<div className="text-3xl">Question</div>
				</div>
				<div className="text-4xl mt-6">
					{type === EXERCISE_TYPE.TERMS
						? 'Какой термин правильный?'
						: 'Какая фраза правильная?'}
				</div>
				<div className="mt-6">
					<WordCard className="mb-6">{currentExpression.expression}</WordCard>
					<div className="grid grid-cols-2 row-auto-2 gap-4">
						{answerOptions.map((option) => (
							<WordCard
								className="cursor-pointer text-gray-600"
								isCorrectAnswer={
									isChosenAnswer
										? correctAnswerId === option.id
											? true
											: chosenExpressionId === option.id
												? false
												: void 0
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

				<div
					className={cn(
						'flex items-center mt-4 gap-2',
						'px-3 py-1 rounded-lg',
						'min-h-[50px]',
						isChosenAnswer && 'bg-white'
					)}
				>
					{isChosenAnswer && (
						<>
							<Image
								src={`/assets/img/${isChosenCorrectAnswer ? 'success' : 'error'}.svg`}
								alt="IMG: Success"
								width={42}
								height={42}
								className="w-[42px] h-[42px]"
							/>
							<div className="text-xl">
								{isChosenCorrectAnswer ? 'Правильно!' : 'Неправильно!'}
							</div>
						</>
					)}
				</div>

				<div className="text-gray-600 flex flex-col gap-5 mt-4">
					<div className="text-3xl">
						<span>Пример: </span>
						<span>{renderBoldFromPipes(currentExpression.example)}</span>
					</div>
					<div className="text-3xl">
						{renderBoldFromPipes(currentExpression.translatedExample)}
					</div>
				</div>

				<div className="flex justify-end items-center mt-3">
					<button
						onClick={onNextCardClickHandler}
						className={cn(
							'flex gap-1 items-center py-3 px-15 rounded-lg',
							'uppercase font-bold',
							isChosenAnswer
								? 'bg-indigo-600 text-white cursor-pointer'
								: 'bg-neutral-300 text-gray-400'
						)}
					>
						<span>{isLastStep ? 'Закончить' : 'Далее'}</span>
						<LiaAngleRightSolid size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
