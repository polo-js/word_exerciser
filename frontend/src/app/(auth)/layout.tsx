import { Header } from '@/layout/header';
import { getAuth } from '@/shared/utils/auth';
import { AuthController } from './_components/auth.controller';
import { RefreshOnNav } from './_components/refresh.on.nav';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Layout({ children }: { children: React.ReactNode }) {
	const { user } = await getAuth();

	return (
		<AuthController initialUser={user}>
			<Header />
			{children}
			<RefreshOnNav />
		</AuthController>
	);
}
