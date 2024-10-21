/** @format */
// 'use client';
// TODO: graphql 적용시켜보기

import './globals.css';

import { ApolloProvider } from '@apollo/client';
// import { ApolloProvider } from '@apollo/client';
import { IProps } from '@/models/children.type';
import RootContainer from '@/components/common/RootContainer';
import client from '~/config/apolloConfig';

// import client from '@/libs/apollo';

export default function RootLayout({ children }: IProps) {
	return (
		<html lang="ko">
			<body className="prose-me_14_20 m-0 box-border flex items-center justify-center p-0">
				<RootContainer>
					<ApolloProvider client={client}>{children}</ApolloProvider>
				</RootContainer>
			</body>
		</html>
	);
}
