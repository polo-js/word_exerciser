// QuestionBlock.tsx
import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import type { IQuestionBlock } from '@/pages-content/final-test/types/questions';

type Props = {
	exercise: IQuestionBlock;
	index: number;
	value: number | null;
	onChange: (answerId: number) => void;
};

export function QuestionBlock({ exercise, index, value, onChange }: Props) {
	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="mb-4 flex items-start gap-3">
				<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
					{index}
				</div>

				<h3 className="text-base font-semibold text-slate-900">{exercise.expression}</h3>
			</div>

			<RadioGroup.Root
				value={value == null ? '' : String(value)}
				onValueChange={(v) => onChange(Number(v))}
				className="grid grid-cols-1 gap-3 md:grid-cols-2"
				aria-label={`Question ${exercise.id}`}
			>
				{exercise.answerOptions.slice(0, 4).map((opt) => {
					const checked = value === opt.id;

					return (
						<label
							key={opt.id}
							className={[
								'group flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition',
								checked
									? 'border-blue-500 bg-blue-50'
									: 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
							].join(' ')}
						>
							<RadioGroup.Item
								value={String(opt.id)}
								className={[
									'flex h-5 w-5 items-center justify-center rounded-full border transition',
									checked
										? 'border-blue-600'
										: 'border-slate-300 group-hover:border-slate-400',
								].join(' ')}
							>
								<RadioGroup.Indicator className="block h-2.5 w-2.5 rounded-full bg-blue-600" />
							</RadioGroup.Item>

							<span className="text-sm font-medium text-slate-900">{opt.expression}</span>
						</label>
					);
				})}
			</RadioGroup.Root>
		</section>
	);
}
