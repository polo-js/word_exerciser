import { checkAuth } from '@/shared/utils/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = await checkAuth({ disableRedirect: true });

	if (isAuthenticated) {
		redirect('/profile');
	}

	return <>{children}</>;
}
