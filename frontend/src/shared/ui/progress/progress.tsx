import cn from 'classnames';
import { Progress } from 'radix-ui';
import { useEffect, useState } from 'react';

interface IProgressProps {
	percent: number;
}

export function ProgressLine({ percent }: IProgressProps) {
	const [currentProgress, setCurrentProgress] = useState<number>(0);
	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentProgress(percent);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<Progress.Root
			className={cn(
				'relative overflow-hidden bg-zinc-200 rounded-lg',
				'w-full h-[15px]',
				'translate-z-0'
			)}
			value={percent}
		>
			<Progress.Indicator
				className={cn(
					'bg-[linear-gradient(to_right,#A4C5EB,#AED1FA)]',
					'w-full',
					'h-full',
					'transition-transform',
					'duration-600',
					'ease-[cubic-bezier(0.65, 0, 0.35, 1)]',
					'rounded-lg'
				)}
				style={{ transform: `translateX(-${100 - currentProgress}%)` }}
			/>
		</Progress.Root>
	);
}
