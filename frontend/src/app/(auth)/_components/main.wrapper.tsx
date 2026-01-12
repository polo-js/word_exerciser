import cn from 'classnames';

interface IMainWrapperProps extends React.PropsWithChildren {
	fullHeight?: boolean;
}

export function MainWrapper({ children, fullHeight = false }: IMainWrapperProps) {
	return (
		<main className={cn(['max-w-[1200px]', 'w-full', fullHeight && 'flex grow'])}>
			{children}
		</main>
	);
}
