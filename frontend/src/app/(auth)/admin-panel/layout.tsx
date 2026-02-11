import { MainWrapper } from '@/shared/ui/wrapper';
import { ModalProvider } from '@/shared/ui/modal';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ModalProvider>
			<MainWrapper width={1600} fullHeight>
				{children}
			</MainWrapper>
		</ModalProvider>
	);
}
