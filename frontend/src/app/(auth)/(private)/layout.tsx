import { requireAuth } from '@/shared/utils/auth';
import { MainWrapper } from '@/app/(auth)/_components/main.wrapper';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await requireAuth();

	return <MainWrapper>{children}</MainWrapper>;
}
