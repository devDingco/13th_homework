/** @format */
// 'use client';

import './globals.css';

// import { ApolloProvider } from '@apollo/client';
import { IProps } from '@/models/children.type';
import RootContainer from '@/components/common/RootContainer';

// import client from '@/libs/apollo';

export default function RootLayout({ children }: IProps) {
	return (
		<html lang="ko">
			<body className="m-0 box-border flex items-center justify-center p-0">
				{/* <ApolloProvider client={client}>{children}</ApolloProvider> */}
				<RootContainer>{children}</RootContainer>
			</body>
		</html>
	);
}
