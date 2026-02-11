import cn from 'classnames';

export function StyledInput(
	props: React.InputHTMLAttributes<HTMLInputElement> & {
		label?: string;
		rootClassName?: string;
		inputClassName?: string;
	}
) {
	const { label, rootClassName, inputClassName, className, ...rest } = props;

	return (
		<div className={cn("space-y-2", rootClassName, className)}>
			{label ? (
				<div className="text-sm font-semibold text-slate-700">{label}</div>
			) : null}

			<input
				{...rest}
				className={cn(
					"h-12 w-full rounded-xl border border-slate-200 bg-white px-4",
					"text-sm text-slate-900 placeholder:text-slate-400",
					"outline-none",
					"focus:border-slate-300 focus:ring-2 focus:ring-slate-200",
					inputClassName
				)}
			/>
		</div>
	);
}