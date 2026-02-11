import cn from 'classnames';

/** ---------- Icons (inline SVG, no extra deps) ---------- */
export function Icon({ children, className }: React.PropsWithChildren<{ className?: string }>) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={cn('h-5 w-5', className)}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
		>
			{children}
		</svg>
	);
}