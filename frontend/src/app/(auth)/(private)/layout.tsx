import { MainWrapper } from '@/shared/ui/wrapper';
import { getAuth } from '@/shared/utils/auth';
import { AuthController } from '@/app/(auth)/_components/auth.controller';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await getAuth();

	if (!user) {
		redirect('/login');
	}

	return (
		<AuthController initialUser={user}>
			<MainWrapper className="items-center" fullHeight withHeader>
				{children}
			</MainWrapper>
		</AuthController>
	);
}
