'use client';
import { Progress } from 'radix-ui';
import { FaCircle } from 'react-icons/fa';
import { IUser } from '@/shared/types/user';
import { useEffect, useState } from 'react';
import { namePretty } from '@/shared/utils/print';
import { ExerciseProgress } from '@/pages-content/profile/exercise.progress';

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
		<div className="border border-gray-600 flex items-center flex-col p-6 w-full">
			<div className="w-full flex flex-col items-center justify-center">
				<div className="uppercase font-bold text-2xl">Профиль</div>
				<div className="text-lg mt-2">Платформа изучения заводского английского</div>
				<hr className="w-full mt-2" />
				<div className="text-2xl mt-10">Добро пожаловать, {nickname}</div>
			</div>
			<div className="flex flex-col max-w-[950px] w-full mt-5">
				{/* Итоговый прогресс */}
				<div className="border border-gray-600">
					<div className="p-5">
						<div className="text-xl mb-1">Итоговый прогресс</div>
						<div className="flex gap-2 items-center">
							<Progress.Root
								className="relative overflow-hidden bg-gray-100 border border-gray-600 w-full h-[25px] translate-z-0"
								value={totalProgress}
							>
								<Progress.Indicator
									className="bg-gray-600 w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
									style={{ transform: `translateX(-${100 - currentProgress}%)` }}
								/>
							</Progress.Root>
							<div className="pl-2 text-xl">{totalProgress}%</div>
						</div>
						<div className="mt-3">
							Минимальное значение прогресса для финального тестирования: 80%
						</div>
					</div>
					<div className="p-5 text-xl border-t border-gray-600 flex items-center gap-3">
						<span>Доступность финального тестирования:</span>
						<span className="flex items-center gap-2">
							<FaCircle color={isFinalTestAvailable ? 'green' : 'red'} size={15} />
							{isFinalTestAvailable ? 'Доступен' : 'Не доступен'}
						</span>
					</div>
				</div>
				{/* Прогресс */}
				<div className="mt-4">
					<div className="uppercase text-xl mb-2">Навигация</div>
					<div className="flex flex-col gap-4">
						{[
							{
								id: 1,
								name: 'Жопарики',
								category: 'Животные',
								type: 'Упражнения',
								total: 30,
								passed: 17,
							},
							void 0,
						].map((progressData) => {
							return (
								<ExerciseProgress
									progress={progressData}
									isAvailable={!!progressData}
									key={progressData?.id || 'finalTest'}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
