import cn from 'classnames';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import React, { JSX } from 'react';

interface IWordCardProps extends React.HTMLAttributes<HTMLDivElement> {
	isCorrectAnswer?: boolean;
}

export function WordCard(props: IWordCardProps) {
	const { className, isCorrectAnswer, ...restProps } = props;

	const [statusElem, statusClassName] =
		isCorrectAnswer === void 0
			? [null, '']
			: isCorrectAnswer
				? [<IoMdCheckmark />, 'bg-green-600 text-white']
				: [<RxCross2 />, 'bg-red-600 text-white'];

	return (
		<div
			className={cn(
				'shadow--card-border-light px-4 py-3 rounded-md',
				'text-xl',
				'flex justify-between items-center',
				statusClassName || 'bg-white',
				props.className
			)}
			{...restProps}
		>
			<div>{props.children}</div>
			<div>{statusElem}</div>
		</div>
	);
}
