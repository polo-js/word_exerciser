import { MainWrapper } from '@/shared/ui/wrapper';

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MainWrapper fullHeight>{children}</MainWrapper>;
}
