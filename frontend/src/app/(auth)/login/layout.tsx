import { getAuth } from '@/shared/utils/auth';
import { redirect } from 'next/navigation';
import { MainWrapper } from '@/app/(auth)/_components/main.wrapper';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = await getAuth();

	if (isAuthenticated) {
		redirect('/profile');
	}

	return <MainWrapper fullHeight>{children}</MainWrapper>;
}
