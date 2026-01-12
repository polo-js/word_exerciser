'use client';
import { useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function RefreshOnNav() {
	const pathname = usePathname();
	const router = useRouter();

	useLayoutEffect(() => {
		router.refresh();
	}, [pathname, router]);

	return null;
}
