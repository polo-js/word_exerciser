'use client';
import { Progress } from 'radix-ui';
import { FaCircle } from 'react-icons/fa';
import { IUser } from '@/shared/types/user';
import { useEffect, useState } from 'react';
import { namePretty } from '@/shared/utils/print';
import { ExerciseProgress } from '@/pages-content/profile/exercise.progress';
import cn from 'classnames';

interface IProfileProps {
	user: IUser;
	totalProgress: number;
}

const FINAL_TEST_PERCENT_NEEDED = 80;

export function Profile({ user, totalProgress }: IProfileProps) {
	const [currentProgress, setCurrentProgress] = useState<number>(0);

	const isFinalTestAvailable = totalProgress >= FINAL_TEST_PERCENT_NEEDED;
	const nickname = namePretty(user);

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentProgress(totalProgress);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div
			className={cn(
				'rounded-xl',
				'border-gray-600',
				'bg-gray-50',
				'flex',
				'items-center',
				'flex-col',
				'w-full',
				'shadow-card',
				'drop-shadow-xs',
				'overflow-hidden'
			)}
		>
			<div
				className={cn(
					'w-full',
					'border-b',
					'border-b-gray-400',
					'bg-white',
					'px-10',
					'py-4',
					'flex',
					'flex-col',
					'items-start',
					'justify-center'
				)}
			>
				<div className="uppercase font-bold text-xl">Закупки на английском языке</div>
				<div className="text-lg">Профессиональная платформа для изучения лексики</div>
			</div>
			<div className="flex flex-col w-full px-10 pb-10 bg-zinc-100">
				<div className="text-2xl mt-6 mb-6">Добро пожаловать, {nickname}</div>
				{/* Итоговый прогресс */}
				<div className="bg-white shadow-card rounded-lg">
					<div className="p-5">
						<div className="text-xl mb-1">Общий прогресс</div>
						<div className="flex gap-2 items-center mt-2">
							<Progress.Root
								className={cn(
									'relative overflow-hidden bg-zinc-100 rounded-xs',
									'w-full h-[25px]',
									'translate-z-0'
								)}
								value={totalProgress}
							>
								<Progress.Indicator
									className={cn(
										'bg-[linear-gradient(to_right,#202326,#93A0B0)]',
										'w-full',
										'h-full',
										'transition-transform',
										'duration-600',
										'ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
									)}
									style={{ transform: `translateX(-${100 - currentProgress}%)` }}
								/>
							</Progress.Root>
							<div className="pl-5 pr-2 text-2xl">{totalProgress}%</div>
						</div>
						<div className="flex items-center gap-3 mt-3">
							<div>Итоговый тест будет доступен при достижении 80% прогресса:</div>
							<div className="flex items-center gap-2">
								<FaCircle color={isFinalTestAvailable ? 'green' : 'red'} size={15} />
								{isFinalTestAvailable ? 'Доступен' : 'Не доступен'}
							</div>
						</div>
					</div>
				</div>
				{/* Прогресс */}
				<div className="mt-4">
					<div className="flex flex-col gap-4">
						{[
							{
								id: 1,
								title: 'Термины',
								description: 'Учите термины братья',
								typeId: 1,
								imgSrc: '/assets/img/office.svg',
								total: 75,
								passed: 17,
							},
							{
								id: 2,
								title: 'Термины',
								description: 'Учите фразы братья',
								typeId: 2,
								imgSrc: '/assets/img/advertising.svg',
								total: 30,
								passed: 12,
							},
							{
								id: 3,
								title: 'Справочный материал',
								description: 'Это вам не справочная',
								typeId: 3,
								imgSrc: '/assets/img/book.svg',
								total: 4,
								passed: 2,
							},
							{
								id: 4,
								title: 'Итоговый тест',
								description: 'Надо было готовиться',
								typeId: 3,
								imgSrc: '/assets/img/shield-warning.svg',
								total: 30,
								passed: 12,
							},
						].map((progressData) => {
							return (
								<ExerciseProgress
									progress={progressData}
									key={progressData.id}
									isReferenceMaterial={progressData.id === 3}
									finalTestSettings={
										progressData.id === 4 ? { isAvailable: false } : void 0
									}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
