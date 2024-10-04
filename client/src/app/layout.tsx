/** @format */

import './globals.css';

import { IProps } from '@/models/children.type';

export default function RootLayout({ children }: IProps) {
	return (
		<html lang="ko">
			<body className="m-0ㅋ box-border flex items-center justify-center p-0">
				{children}
			</body>
		</html>
	);
}
