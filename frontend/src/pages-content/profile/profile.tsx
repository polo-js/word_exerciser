'use client';
import cn from 'classnames';
import { Progress } from 'radix-ui';
import { useContext, useEffect, useMemo, useState } from 'react';
import { namePretty } from '@/shared/utils/print';
import { ExerciseProgress } from './exercise.progress';
import { IProfileProgress, IProgress } from '@/pages-content/profile/types/progress';
import { RiLock2Line } from 'react-icons/ri';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/app/(auth)/_components/auth.controller';

interface IProfileProps {
	progress: IProfileProgress;
}

export function Profile({ progress }: IProfileProps) {
	const [currentProgress, setCurrentProgress] = useState<number>(0);
	const { user } = useContext(AuthContext);

	const { finalTestIsAvailable, totalProgress, finalTestThresholdPercent, progressList } =
		progress;

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentProgress(totalProgress);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (!user) {
		redirect('/login');
	}

	const nickname = namePretty(user);

	return (
		<div className="flex flex-col w-full">
			<div className="text-3xl font-semibold tracking-tight text-gray-900 mb-6">
				Добро пожаловать, {nickname}
			</div>

			{/* Итоговый прогресс */}
			<div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm">
				<div className="p-6">
					{/* Заголовок */}
					<div>
						<div className="text-lg font-medium text-gray-900">Прогресс обучения</div>
						<div className="text-sm text-gray-500 mt-1">
							Дойдите до {finalTestThresholdPercent}%, чтобы открыть финальный тест
						</div>
					</div>

					{/* Прогресс-бар */}
					<div className="mt-5 flex items-center gap-4">
						<Progress.Root
							className={cn(
								'relative overflow-hidden bg-zinc-100 rounded-full',
								'w-full h-[12px]',
								'translate-z-0'
							)}
							value={totalProgress}
						>
							<Progress.Indicator
								className={cn(
									'bg-[linear-gradient(to_right,#202326,#93A0B0)]',
									'w-full h-full',
									'transition-transform duration-700',
									'ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
								)}
								style={{ transform: `translateX(-${100 - currentProgress}%)` }}
							/>
						</Progress.Root>

						<div className="min-w-[56px] text-right text-2xl font-semibold text-gray-900">
							{totalProgress}%
						</div>
					</div>

					{/* Статус финального теста (оставляем один раз) */}
					<div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
						<span>Статус финального теста:</span>
						<span className="inline-flex items-center gap-2">
							<span
								className={cn(
									'h-2 w-2 rounded-full',
									finalTestIsAvailable ? 'bg-emerald-500' : 'bg-rose-500'
								)}
							/>
							{finalTestIsAvailable ? 'Доступен' : 'Недоступен'}
						</span>
					</div>
				</div>
			</div>

			{/* Прогресс */}
			<div className="mt-5">
				<div className="flex flex-col gap-4">
					{progressList.map((progressData) => {
						return <ExerciseProgress progress={progressData} key={progressData.id} />;
					})}
					<FinalTest finalTestIsAvailable={finalTestIsAvailable} />
				</div>
			</div>
		</div>
	);
}

type ICalculatedProgressProps = 'hrefToMaterials' | 'progressText';
const FINAL_TEST_CONFIG: Omit<IProgress, ICalculatedProgressProps> = {
	id: 4,
	title: 'Итоговый тест',
	description: 'Проверьте знания по пройденным материалам',
	imgSrc: '/assets/img/shield-warning.svg',
};

function FinalTest({
	finalTestIsAvailable,
}: Pick<IProfileProgress, 'finalTestIsAvailable'>) {
	const progressConfig = useMemo<IProgress>(() => {
		const config = finalTestIsAvailable
			? {
					hrefToMaterials: '/final-test',
					progressText: <span>Доступно</span>,
				}
			: {
					progressText: (
						<span className="flex gap-2 items-center justify-between">
							<RiLock2Line />
							<span>Закрыто</span>
						</span>
					),
				};

		return { ...FINAL_TEST_CONFIG, ...config };
	}, [finalTestIsAvailable]);

	return <ExerciseProgress progress={progressConfig} />;
}

