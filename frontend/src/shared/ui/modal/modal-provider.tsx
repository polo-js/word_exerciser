"use client";

import * as React from "react";
import cn from "classnames";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type ModalOptions = {
	title?: React.ReactNode;
	description?: React.ReactNode;
	content: React.ReactNode;
	widthClassName?: string; // если захочешь менять ширину
};

type ModalContextValue = {
	openModal: (options: ModalOptions) => void;
	closeModal: () => void;
};

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useAppModal() {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error("useAppModal must be used within <ModalProvider />");
	return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(false);
	const [opts, setOpts] = React.useState<ModalOptions | null>(null);

	const openModal = React.useCallback((options: ModalOptions) => {
		setOpts(options);
		setOpen(true);
	}, []);

	const closeModal = React.useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}

			<Dialog.Root
				open={open}
				onOpenChange={(v) => {
					setOpen(v);
					// чистим контент после закрытия, чтобы не мерцал при следующем открытии
					if (!v) setOpts(null);
				}}
			>
				<Dialog.Portal>
					<Dialog.Overlay
						className={cn(
							"fixed inset-0 z-50 bg-black/30",
							"data-[state=open]:animate-in data-[state=closed]:animate-out",
							"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
						)}
					/>

					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
						<Dialog.Content
							className={cn(
								"w-full max-w-[1200px]",
								"max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]",
								"rounded-3xl border border-slate-200 bg-white shadow-xl",
								"focus:outline-none",
								opts?.widthClassName
							)}
						>
							{/* Header */}
							<div className="flex items-start justify-between gap-3 border-b border-slate-200 px-6 py-4">
								<div className="min-w-0">
									{opts?.title ? (
										<Dialog.Title className="truncate text-lg font-bold text-slate-900">
											{opts.title}
										</Dialog.Title>
									) : null}

									{opts?.description ? (
										<Dialog.Description className="mt-1 text-sm text-slate-500">
											{opts.description}
										</Dialog.Description>
									) : null}
								</div>

								<Dialog.Close asChild>
									<button
										type="button"
										aria-label="Закрыть"
										className={cn(
											"inline-flex h-10 w-10 items-center justify-center rounded-xl",
											"text-slate-600 hover:bg-slate-100 hover:text-slate-900",
											"focus:outline-none focus:ring-2 focus:ring-slate-300"
										)}
									>
										✕
									</button>
								</Dialog.Close>
							</div>

							{/* Scroll Body */}
							<div className="min-h-0 px-6 py-5">
								<ScrollArea.Root className="h-[calc(100vh-2rem-72px)] sm:h-[calc(100vh-4rem-72px)]">
									<ScrollArea.Viewport className="h-full w-full pr-3">
										<div className="space-y-4">{opts?.content}</div>
									</ScrollArea.Viewport>

									<ScrollArea.Scrollbar
										className="flex w-2.5 touch-none select-none p-0.5"
										orientation="vertical"
									>
										<ScrollArea.Thumb className="relative flex-1 rounded-full bg-slate-300" />
									</ScrollArea.Scrollbar>
								</ScrollArea.Root>
							</div>

							{/* Footer (опционально можешь убрать) */}
							<div className="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4">
								<Dialog.Close asChild>
									<button
										type="button"
										className={cn(
											"rounded-xl px-4 py-2 text-sm font-semibold",
											"bg-slate-100 text-slate-900 hover:bg-slate-200",
											"focus:outline-none focus:ring-2 focus:ring-slate-300"
										)}
									>
										Закрыть
									</button>
								</Dialog.Close>
							</div>
						</Dialog.Content>
					</div>
				</Dialog.Portal>
			</Dialog.Root>
		</ModalContext.Provider>
	);
}
