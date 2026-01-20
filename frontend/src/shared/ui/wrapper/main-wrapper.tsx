'use client';
import cn from 'classnames';
import { userServiceStore } from '@/pages-content/login';
import { usePathname, useRouter } from 'next/navigation';

interface IMainWrapperProps extends React.PropsWithChildren {
	fullHeight?: boolean;
	className?: string;
	withHeader?: boolean;
}

export function MainWrapper({
	children,
	className,
	fullHeight = false,
	withHeader = false,
}: IMainWrapperProps) {
	const pathname = usePathname();
	const router = useRouter();
	const isProfile = pathname.startsWith('/profile');

	const rightBtnClickHandler = async () => {
		if (isProfile) {
			await userServiceStore.logout();
			window.location.href = '/login';
			return;
		}

		router.push('/profile');
	};

	return (
		<main
			className={cn(['max-w-[1200px]', 'w-full', fullHeight && 'flex grow', className])}
		>
			{withHeader ? (
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
							'justify-between'
						)}
					>
						<div className={cn('flex', 'flex-col', 'items-start', 'justify-center')}>
							<div className="uppercase font-bold text-xl">
								Закупки на английском языке
							</div>
							<div className="text-lg">
								Профессиональная платформа для изучения лексики
							</div>
						</div>
						<div className="flex items-center">
							<button
								onClick={rightBtnClickHandler}
								className="shadow--card-border px-3 py-1 rounded-md cursor-pointer"
							>
								{isProfile ? 'Выйти' : 'Вернуться в профиль'}
							</button>
						</div>
					</div>
					<div className="flex flex-col w-full px-10 py-8 bg-zinc-100">{children}</div>
				</div>
			) : (
				children
			)}
		</main>
	);
}
