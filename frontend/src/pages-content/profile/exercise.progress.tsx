import cn from 'classnames';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { IProgress } from '@/pages-content/profile/types/progress';
import Image from 'next/image';
import Link from 'next/link';

interface IExerciseProgressProps {
	progress: IProgress;
}

export function ExerciseProgress({ progress }: IExerciseProgressProps) {
	return (
		<Link
			href={progress.hrefToMaterials || ''}
			aria-disabled={!!progress.hrefToMaterials}
			className={cn(!progress.hrefToMaterials && 'pointer-events-none')}
		>
			<div
				className={cn([
					'bg-white rounded-lg',
					'shadow-small-card',
					'pl-6 py-4 pr-2',
					'flex items-center justify-between',
					progress.hrefToMaterials && 'cursor-pointer',
				])}
			>
				<div className="flex gap-3">
					<div>
						<Image
							src={progress.imgSrc}
							alt={'IMG'}
							width={50}
							height={50}
							className="w-[50px] h-[50px]"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="text-3xl">{progress.title}</div>
						<div className="text-xl">{progress.description}</div>
					</div>
				</div>
				<div className={cn(['flex', 'self-stretch', 'items-center', 'gap-2', 'mb-4'])}>
					<div className="text-lg">{progress.progressText}</div>
					<div>
						<LiaAngleRightSolid size="25" />
					</div>
				</div>
			</div>
		</Link>
	);
}
