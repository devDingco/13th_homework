'use client';

import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	InMemoryCache,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useAccessTokenStore } from '../stores/access-token-store';
import { useEffect } from 'react';

const GLOBAL_CACHE = new InMemoryCache();

interface IApolloUploadSetting {
	children: React.ReactNode;
}
export default function ApolloHeaderSettingLocalStorage(
	props: IApolloUploadSetting,
) {
	const { accessToken, setAccessToken } = useAccessTokenStore();

	// 토큰을 localStorage에서 가져와 설정
	useEffect(() => {
		const token = localStorage.getItem('accessToken') ?? '';
		setAccessToken(token);
	}, []);

	const uploadLink = createUploadLink({
		uri: 'http://main-practice.codebootcamp.co.kr/graphql',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const client = new ApolloClient({
		link: ApolloLink.from([uploadLink]),
		cache: GLOBAL_CACHE,
	});

	return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
