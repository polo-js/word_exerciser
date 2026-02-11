import cn from 'classnames';
import * as React from 'react';
import { Icon } from '@/shared/ui/icon';

export function Item(props: {
	title: string;
	id: number;
	countLabel?: string;
	onEdit?: () => void;
	onDelete?: () => void;
	onClick?: (id: number) => void;
	isChosen?: boolean;
}) {
	const { title, countLabel, onEdit, onDelete, isChosen, onClick, id } = props;

	return (
		<div
			className={cn(
				'group relative flex items-center justify-between gap-3',
				'rounded-2xl border px-4 py-4 shadow-sm transition',
				'cursor-pointer select-none',
				isChosen
					? [
							'border-emerald-300 bg-emerald-50/70',
							'ring-1 ring-emerald-200',
							'shadow-[0_8px_24px_-14px_rgba(16,185,129,0.55)]',
						]
					: [
							'border-slate-200 bg-white',
							'hover:bg-slate-50',
							'hover:border-slate-300',
							'hover:shadow-md',
						]
			)}
			onClick={() => onClick?.(id)}
		>
			<div className="min-w-0">
				<div className="text-sm font-semibold text-slate-900">{title}</div>
				{countLabel && <div className="mt-1 text-sm text-slate-500">{countLabel}</div>}
			</div>

			<div className="flex shrink-0 items-center gap-1">
				<IconButton aria-label="Редактировать" onClick={onEdit}>
					<PencilIcon />
				</IconButton>
				<IconButton aria-label="Удалить" onClick={onDelete}>
					<XIcon />
				</IconButton>
			</div>
		</div>
	);
}

/** ---------- Reusable UI bits ---------- */
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { className, ...rest } = props;
	return (
		<button
			type="button"
			className={cn(
				'inline-flex h-9 w-9 items-center justify-center rounded-lg',
				'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
				'focus:outline-none focus:ring-2 focus:ring-slate-300',
				className
			)}
			{...rest}
		/>
	);
}

const PencilIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M4 20h4l10.5-10.5a2 2 0 0 0 0-3L16.5 4.5a2 2 0 0 0-3 0L3 15v5Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinejoin="round"
		/>
		<path
			d="M13.5 6.5 17.5 10.5"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</Icon>
);

const XIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M6 6l12 12M18 6 6 18"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</Icon>
);
