'use client';
import { userServiceStore } from '@/pages-content/login';
import { useRouter } from 'next/navigation';

interface ILogButtonProps {
	isAuthenticated: boolean;
}

export function LogButton({ isAuthenticated }: ILogButtonProps) {
	const router = useRouter();
	const onClickHandler = () => {
		if (isAuthenticated) {
			void userServiceStore.logout();
			router.push('/login');
		} else {
			router.push('/login');
		}
	};

	return (
		<button onClick={onClickHandler} className="border-1 cursor-pointer px-2 py-1">
			{isAuthenticated ? 'Logout' : 'Login'}
		</button>
	);
}
