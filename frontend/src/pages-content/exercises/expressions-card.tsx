import { IExerciseExpressions } from '@/pages-content/exercises/types/exercises';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { WordCard } from '@/shared/ui/word-card';

interface IExpressionsCardProps {
	expression: IExerciseExpressions[];
	selectedExercise: string;
	onBackToCategoryClick: () => void;
}

export function ExpressionsCard({
	expression,
	selectedExercise,
	onBackToCategoryClick,
}: IExpressionsCardProps) {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const currentIndex = currentStep - 1;

	const currentExpression = expression[currentIndex];

	return (
		<div>
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
				<div className="flex items-center text-xl">{`${currentStep} / ${expression.length}`}</div>
			</div>
			<div className="flex flex-col mt-6">
				<div className="flex gap-4 items-center">
					<Image src="/assets/img/bulb.svg" alt="IMG: Bulb" width={42} height={42} />
					<div className="text-3xl">Question</div>
				</div>
				<div className="text-4xl mt-6">Какой термин правильный?</div>
				<div className="mt-6">
					<WordCard className="mb-4">{currentExpression.expression}</WordCard>
					<div className="grid grid-cols-2 row-auto-2 gap-4">
						{currentExpression.answerOptions.map((option) => (
							<WordCard className="cursor-pointer" key={option.id}>
								{option.expression}
							</WordCard>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
