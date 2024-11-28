/** @format */

import './globals.css';

import Header from '@/components/Header';
import { IChildrenProps } from '@/types/layout.type';
import QueryProvider from '@/utils/QueryProvider';

export default function RootLayout({ children }: IChildrenProps) {
	return (
		<html lang="ko">
			<body className="flex flex-col px-2 relative">
				<Header />
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
