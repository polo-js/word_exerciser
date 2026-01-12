'use client';
import { LogButton } from './log.button';
import { Logo } from './logo';
import { namePretty } from '@/shared/utils/print';
import { userServiceStore } from '@/pages-content/login';
import { useService } from '@/shared/hooks/store';

export function Header() {
	const { user } = useService(userServiceStore);
	const isAuthenticated = !!user;
	const username = user && namePretty(user);

	return (
		<header className="border-b-1 border-gray-600 flex justify-center mb-8 w-full">
			<div className="max-w-[1200px] w-full flex justify-between items-center">
				<Logo />
				<div className="flex items-center justify-between gap-2">
					{username}
					<LogButton isAuthenticated={isAuthenticated} />
				</div>
			</div>
		</header>
	);
}
