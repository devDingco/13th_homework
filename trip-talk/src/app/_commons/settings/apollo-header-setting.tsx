// apollo-header-setting.ts
'use client';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useEffect, useState } from 'react';

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSettingCacheTest(props: IApolloSetting) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 클라이언트 측에서만 토큰을 가져오도록 useEffect 사용
  useEffect(() => {
    setAccessToken(window.localStorage.getItem('accessToken'));
  }, []);

  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    ...(accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {}),
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
