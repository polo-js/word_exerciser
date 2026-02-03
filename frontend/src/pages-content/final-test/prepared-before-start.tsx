import Image from 'next/image';

interface IProps {
	onStart: () => void;
}

export function PreparedBeforeStart({ onStart }: IProps) {
	return (
		<div className="rounded-2xl px-8 py-8">
			{/* Title */}
			<h1 className="text-center text-4xl font-semibold tracking-tight text-slate-700">
				Get ready for the final test
			</h1>

			<div className="mt-8 space-y-6">
				{/* Top block */}
				<div className="rounded-2xl py-7">
					<div className="flex items-center gap-10">
						{/* Placeholder image */}
						<div className="shrink-0">
							<Image
								src="assets/img/percentages.svg"
								alt="IMG: Percentage"
								width={320}
								height={320}
							/>
						</div>

						{/* Right content */}
						<div className="flex-1">
							<div className="rounded-2xl border border-slate-200/70 bg-slate-100/100 p-6">
								<div className="flex items-center gap-3">
									<Image
										src="/assets/img/check-circle.svg"
										alt="IMG: Check"
										width={40}
										height={40}
										className="h-7 w-7"
									/>
									<div className="text-lg font-medium text-slate-700">
										You are ready to take the final test.
									</div>
								</div>

								<div className="mt-4 rounded-xl border border-slate-200/70 bg-slate-50/70 px-6 py-4">
									<ul className="space-y-2 text-slate-600">
										<li className="flex items-start gap-3">
											<span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
											<span>
												Zalupa
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
											<span>
												Zalupa2
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
											<span>Questions will change if test is retaken</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom block */}
				<div className="rounded-2xl border border-slate-200/70 bg-slate-100/100 px-8 py-7">
					<div className="grid grid-cols-2 gap-10">
						{/* Left warning */}
						<div className="flex items-start gap-4">
							<Image
								src="/assets/img/warning.svg"
								alt="IMG: Warning"
								width={40}
								height={40}
								className="h-7 w-7"
							/>
							<div>
								<div className="text-lg font-semibold text-slate-700">
									Make sure you are well prepared!
								</div>
								<div className="mt-2 max-w-[360px] text-slate-600">
									Test your knowledge and skills gained <br />
									in this course.
								</div>
							</div>
						</div>

						{/* Right action */}
						<div className="rounded-2xl px-8 py-6">
							<div className="flex flex-col items-center justify-center">
								<button
									type="button"
									className="w-[420px] max-w-full rounded-lg bg-emerald-600 px-8 py-4 text-xl font-medium text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 cursor-pointer"
									onClick={() => onStart()}
								>
									Start
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
