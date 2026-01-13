import { IProgress } from '@/shared/types/progress';
import cn from 'classnames';
import { RiLock2Line } from 'react-icons/ri';
import { LiaAngleRightSolid } from 'react-icons/lia';
import Image from 'next/image';

interface IExerciseProgressProps {
	progress: IProgress;
	finalTestSettings?: {
		isAvailable: boolean;
	};
	isReferenceMaterial?: boolean;
}

export function ExerciseProgress({
	progress,
	finalTestSettings,
	isReferenceMaterial,
}: IExerciseProgressProps) {
	const isFinalTest = !!finalTestSettings;
	const isAvailable = finalTestSettings?.isAvailable ?? true;
	const counter = `${progress.passed}/${progress.total} ${isReferenceMaterial ? 'Просмотрено' : 'Выучено'}`;

	return (
		<div
			className={cn([
				'bg-white rounded-lg',
				'shadow-small-card',
				'pl-6 py-4 pr-2',
				'flex items-center justify-between',
				isAvailable && 'cursor-pointer',
			])}
		>
			<div className="flex gap-3">
				<div>
					<Image src={progress.imgSrc} alt={'IMG'} width={50} height={50} />
				</div>
				<div className="flex flex-col gap-1">
					<div className="text-3xl">{progress.title}</div>
					<div className="text-xl">{progress.description}</div>
				</div>
			</div>
			<div className={cn(['flex', 'self-stretch', 'items-center', 'gap-2', 'mb-4'])}>
				<div className="text-lg">
					{isFinalTest ? (
						<span className="flex gap-2 items-center justify-between">
							<RiLock2Line />
							<span>Закрыто</span>
						</span>
					) : (
						<span>{counter}</span>
					)}
				</div>
				<div>
					<LiaAngleRightSolid size="25" />
				</div>
			</div>
		</div>
	);
}
