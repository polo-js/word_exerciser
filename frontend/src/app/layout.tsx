import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import cn from 'classnames';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
	title: 'Govno',
	description: 'Zalupa',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log(123);
	return (
		<html lang="ru">
			<body
				className={cn(
					roboto.className,
					'antialiased',
					'min-h-screen',
					'flex',
					'flex-col',
					'items-center',
					'text-base',
					'text-gray-800',
					'bg-gray-100',
					'py-8'
				)}
			>
				{children}
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
