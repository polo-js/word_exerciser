import cn from 'classnames';

interface IWordCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WordCard(props: IWordCardProps) {
	const { className, ...restProps } = props;
	return (
		<div
			className={cn(
				'shadow--card-border-light px-4 py-3 bg-white rounded-md',
				'text-xl',
				props.className
			)}
			{...restProps}
		>
			{props.children}
		</div>
	);
}
