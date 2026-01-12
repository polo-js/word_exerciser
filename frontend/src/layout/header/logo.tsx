'use client';
import { MdOutlineFactory } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export function Logo() {
	const router = useRouter();

	const onClickHandler = () => {
		router.push('/');
	};

	return (
		<MdOutlineFactory className="cursor-pointer" onClick={onClickHandler} size={48} />
	);
}
