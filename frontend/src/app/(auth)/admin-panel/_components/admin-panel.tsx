'use client';
import * as React from 'react';
import cn from 'classnames';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';
import { Icon } from '@/shared/ui/icon';
import { Item } from '@/app/(auth)/admin-panel/_components/item';
import { useLayoutEffect, useState } from 'react';
import { FullFormatExercise, FullFormatExpression, UserListItem } from './types/response';
import { EXERCISE_TYPE } from '@/const';
import { namePretty, pluralRu } from '@/shared/utils/print';
import { useAppModal } from '@/shared/ui/modal';
import { AddCardModalContent } from '@/app/(auth)/admin-panel/_components/modal-expression';
import { IoMdExit } from 'react-icons/io';
import { userServiceStore } from '@/pages-content/login';
import {
	CreateExercisesExpressionBody,
	UpdateExercisesExpressionBody,
} from '@/app/(auth)/admin-panel/_components/types/transfer';
import { serverFetch } from '@/shared/api/server-fetch';
import { toast } from 'sonner';
import { updateData } from '@/shared/utils/server-utils';

const PlusIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M12 5v14M5 12h14"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</Icon>
);

const CardsIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M7 7h12a2 2 0 0 1 2 2v10H9a2 2 0 0 1-2-2V7Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinejoin="round"
		/>
		<path
			d="M5 17V5a2 2 0 0 1 2-2h12"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</Icon>
);

const ChatIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M21 12a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-6.5A7.5 7.5 0 0 1 3 12 7.5 7.5 0 0 1 10.5 4.5H13.5A7.5 7.5 0 0 1 21 12Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinejoin="round"
		/>
	</Icon>
);

const BookIcon = (p: { className?: string }) => (
	<Icon className={p.className}>
		<path
			d="M6 4h10a3 3 0 0 1 3 3v13H8.5A2.5 2.5 0 0 0 6 22V4Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinejoin="round"
		/>
		<path d="M6 19.5h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
	</Icon>
);

function PrimaryButton(
	props: React.ButtonHTMLAttributes<HTMLButtonElement> & { leftIcon?: React.ReactNode }
) {
	const { className, leftIcon, children, ...rest } = props;
	return (
		<button
			type="button"
			className={cn(
				'inline-flex items-center gap-2 rounded-xl px-4 py-2.5',
				'bg-emerald-700 text-white shadow-sm hover:bg-emerald-800',
				'focus:outline-none focus:ring-2 focus:ring-emerald-300',
				className
			)}
			{...rest}
		>
			{leftIcon}
			<span className="text-sm font-semibold">{children}</span>
		</button>
	);
}

/** ---------- Scroll container (Radix ScrollArea) ---------- */
function ScrollList(props: React.PropsWithChildren<{ className?: string }>) {
	return (
		<ScrollArea.Root className={cn('h-full w-full max-h-[700px]', props.className)}>
			<ScrollArea.Viewport className="h-full w-full pr-3">
				{props.children}
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar
				className="flex w-2.5 touch-none select-none p-0.5"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="relative flex-1 rounded-full bg-slate-300" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	);
}

/** ---------- Sidebar ---------- */
function NavItem(props: {
	icon: React.ReactNode;
	label: string;
	active?: boolean;
	onClick?: () => void;
}) {
	const { icon, label, active, onClick } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left',
				'text-slate-700 hover:bg-slate-100',
				active && 'bg-slate-100 text-slate-900',
				'cursor-pointer'
			)}
		>
			{active && (
				<span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600" />
			)}
			<span
				className={cn(
					'ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl',
					active ? 'bg-blue-600/10 text-blue-700' : 'bg-slate-200/60 text-slate-600'
				)}
			>
				{icon}
			</span>
			<span className="text-sm font-semibold">{label}</span>
		</button>
	);
}

enum CHOSEN_TAB {
	TERMS,
	PHRASES,
	USERS,
}

interface IAdminBlockProps {
	terms: FullFormatExercise<EXERCISE_TYPE.TERMS>[];
	phrases: FullFormatExercise<EXERCISE_TYPE.PHRASES>[];
	users: UserListItem[];
}

type TypeNotUser =
	| FullFormatExercise<EXERCISE_TYPE.TERMS>
	| FullFormatExercise<EXERCISE_TYPE.PHRASES>;

/** ---------- Main layout (ONLY the part below the top bar) ---------- */
export function AdminBlock({ terms, phrases, users }: IAdminBlockProps) {
	const itemsMap = {
		[CHOSEN_TAB.TERMS]: terms,
		[CHOSEN_TAB.PHRASES]: phrases,
		[CHOSEN_TAB.USERS]: users,
	};

	const itemsMapExercise = {
		[CHOSEN_TAB.TERMS]: EXERCISE_TYPE.TERMS,
		[CHOSEN_TAB.PHRASES]: EXERCISE_TYPE.PHRASES,
	};

	const { openModal, closeModal } = useAppModal();

	const [chosenTab, setChosenTab] = useState<CHOSEN_TAB>(CHOSEN_TAB.TERMS);
	const [chosenCategory, setChosenCategory] = useState<TypeNotUser>(
		itemsMap[chosenTab][0] as TypeNotUser
	);

	useLayoutEffect(() => {
		if (chosenTab !== CHOSEN_TAB.USERS) {
			setChosenCategory((lastCategory) => {
				const currentCategory = itemsMap[chosenTab].find(
					(category) => category.id === lastCategory.id
				);
				if (!currentCategory) {
					return itemsMap[chosenTab][0];
				} else {
					return currentCategory;
				}
			});
		}
	}, [terms, phrases]);

	const onCategoryClick = (id: number) => {
		const currentItem = itemsMap[chosenTab] as TypeNotUser[];
		const nextCategory = currentItem.find((c) => c.id === id);
		if (!nextCategory) {
			throw new Error('Не нашлась категория!');
		}

		setChosenCategory(nextCategory);
	};

	const onTabClick = (tab: CHOSEN_TAB) => {
		if (tab === chosenTab) {
			return;
		}

		if (tab !== CHOSEN_TAB.USERS) {
			setChosenCategory(itemsMap[tab][0]);
		}
		setChosenTab(tab);
	};

	const onCreateExpression = async (expression: CreateExercisesExpressionBody) => {
		const result = await serverFetch('/admin/exercises-expressions', {
			method: 'POST',
			body: JSON.stringify(expression),
		});
		closeModal();

		if (!result.success) {
			toast.error(result.error?.message ?? 'Что-то пошло не так');
			return;
		}

		toast.success('Добавление прошло успешно');

		updateData('admin-panel');
	};

	const onUpdateExpression = async (
		id: number,
		expression: UpdateExercisesExpressionBody
	) => {
		const result = await serverFetch(`/admin/exercises-expressions?id=${id}`, {
			method: 'PATCH',
			body: JSON.stringify(expression),
		});
		closeModal();

		if (!result.success) {
			toast.error(result.error?.message ?? 'Что-то пошло не так');
			return;
		}

		toast.success('Изменения прошли успешно');

		updateData('admin-panel');
	};

	return (
		<div className="bg-slate-50 w-full h-auto">
			<div className="mx-auto h-full flex max-w-[1600px] gap-0 px-6 py-6">
				{/* Sidebar (dashboard) */}
				<aside
					className={cn(
						'w-[280px] shrink-0 h-auto',
						'rounded-3xl border border-slate-200 bg-white/70',
						'backdrop-blur',
						'flex flex-col justify-between'
					)}
				>
					<div>
						<div className="p-4">
							<div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
								<div className="text-sm font-semibold text-slate-900">Администратор</div>
							</div>
						</div>

						<div className="px-4 pb-4">
							<nav className="space-y-2">
								<NavItem
									icon={<CardsIcon />}
									label="Карточки терминов"
									onClick={() => onTabClick(CHOSEN_TAB.TERMS)}
									active={chosenTab === CHOSEN_TAB.TERMS}
								/>
								<NavItem
									icon={<ChatIcon />}
									label="Карточки фраз"
									onClick={() => onTabClick(CHOSEN_TAB.PHRASES)}
									active={chosenTab === CHOSEN_TAB.PHRASES}
								/>
								<NavItem
									icon={<BookIcon />}
									label="Пользователи"
									onClick={() => onTabClick(CHOSEN_TAB.USERS)}
									active={chosenTab === CHOSEN_TAB.USERS}
								/>
							</nav>
						</div>
					</div>

					<div className="p-4">
						<Separator.Root className="mx-4 h-px bg-slate-200" />
						<button
							type="button"
							className={cn(
								'flex w-full items-center gap-3 rounded-2xl px-3 py-3',
								'text-slate-600 hover:bg-slate-100',
								'cursor-pointer'
							)}
							onClick={async () => {
								await userServiceStore.logout();
								window.location.href = '/login';
							}}
						>
							<span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/60">
								<IoMdExit size={24} />
							</span>
							<span className="text-sm font-semibold">Выйти</span>
						</button>
					</div>
				</aside>

				{/* Content */}
				<main className="flex min-w-0 flex-1 gap-6 pl-6">
					<div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_450px] gap-6">
						{/* Terms list */}
						<section
							className={cn(
								'min-w-0',
								'rounded-3xl border border-slate-200 bg-white shadow-sm',
								'flex flex-col'
							)}
						>
							<div className="flex items-center justify-between gap-3 px-6 py-5">
								<h2 className="text-xl font-bold text-slate-900">Список элементов</h2>
								<PrimaryButton
									onClick={() => {
										if (chosenTab === CHOSEN_TAB.USERS) {
										} else {
											openModal({
												content: (
													<AddCardModalContent
														type={itemsMapExercise[chosenTab]}
														exerciseId={chosenCategory.id}
														onCreate={onCreateExpression}
													/>
												),
												title: 'Добавление',
											});
										}
									}}
									leftIcon={<PlusIcon className="h-5 w-5" />}
								>
									Добавить
								</PrimaryButton>
							</div>

							<Separator.Root className="h-px bg-slate-200" />

							{/* Scroll container вместо пагинации */}
							<div className="flex min-h-0 flex-1 flex-col p-6">
								<div className="min-h-0 flex-1">
									<ScrollList>
										<div className="space-y-3">
											{(chosenTab === CHOSEN_TAB.USERS
												? users
												: chosenCategory.expressions
											).map((t) => (
												<Item
													key={t.id}
													id={t.id}
													title={
														chosenTab === CHOSEN_TAB.USERS
															? namePretty(t as UserListItem)
															: (t as FullFormatExpression).expression
													}
													onEdit={() => {
														if (chosenTab === CHOSEN_TAB.USERS) {
														} else {
															openModal({
																content: (
																	<AddCardModalContent
																		type={itemsMapExercise[chosenTab]}
																		expression={t as FullFormatExpression}
																		exerciseId={chosenCategory.id}
																		onUpdate={onUpdateExpression}
																	/>
																),
																title: t ? 'Изменение элемента' : 'Добавление',
															});
														}
													}}
													onDelete={() => {}}
												/>
											))}
										</div>
									</ScrollList>
								</div>
							</div>
						</section>

						{/* Categories list */}
						{chosenTab !== CHOSEN_TAB.USERS && (
							<section
								className={cn(
									'min-w-0',
									'rounded-3xl border border-slate-200 bg-white shadow-sm',
									'flex flex-col'
								)}
							>
								<div className="flex items-center justify-between gap-3 px-6 py-5">
									<h2 className="text-xl font-bold text-slate-900">Категории</h2>
									<PrimaryButton leftIcon={<PlusIcon className="h-5 w-5" />}>
										Добавить
									</PrimaryButton>
								</div>

								<Separator.Root className="h-px bg-slate-200" />

								<div className="flex min-h-0 flex-1 flex-col p-6">
									<div className="min-h-0 flex-1">
										<ScrollList>
											<div className="space-y-3">
												{(chosenTab === CHOSEN_TAB.TERMS ? terms : phrases).map((c) => (
													<Item
														key={c.id}
														title={c.name}
														id={c.id}
														isChosen={c.id === chosenCategory.id}
														countLabel={
															c.expressions.length +
															' ' +
															pluralRu(
																c.expressions.length,
																chosenTab === CHOSEN_TAB.TERMS
																	? ['термин', 'термина', 'терминов']
																	: ['фраза', 'фразы', 'фраз']
															)
														}
														// onDelete={() => {}}
														onClick={onCategoryClick}
													/>
												))}
											</div>
										</ScrollList>
									</div>
								</div>
							</section>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
