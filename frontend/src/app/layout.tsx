import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
	title: 'Govno',
	description: 'Zalupa',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${roboto.className} antialiased min-h-screen flex flex-col items-center text-base text-gray-800`}
			>
				{children}
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
