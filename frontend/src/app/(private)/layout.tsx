import { withAuth } from '@/shared/utils/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = await withAuth();

	if (!isAuthenticated) {
		redirect('/login');
	}

	return <>{children}</>;
}
