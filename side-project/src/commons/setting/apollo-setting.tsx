'use client';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useAccessTokenStore } from '../stores/accessToken';

interface IApolloSetting {
  children: React.ReactNode;
}
const GLOBAL_SETTINGS = new InMemoryCache();

export default function ApolloSetting(props: IApolloSetting) {
  const { accessToken } = useAccessTokenStore();
  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_SETTINGS,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
