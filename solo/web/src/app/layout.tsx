/** @format */

import './globals.css';

import Header from '@/components/Header';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className="flex flex-col px-2 relative">
				<Header />
				{children}
			</body>
		</html>
	);
}
