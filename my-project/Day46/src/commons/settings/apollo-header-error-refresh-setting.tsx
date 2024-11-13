"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/access-token-store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../libraries/getAccessToken";
import { useLoadStore } from "../stores/load-store";

const DEFAULT_CACHE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderAndErrorSettingRefresh(
  props: IApolloSetting
) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 3. 새로고침시 프리랜더링 무시 - useEffect 방법
  useEffect(() => {
    // 3-2. refreshToken 방식
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(() => setIsLoaded());
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken을 저장하고, 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken);
              operation.setContext({
                header: {
                  ...operation.getContext().headers, // Authorization: Bearer 만료된 토큰
                  Authorization: `Bearer ${newAccessToken}`, // 3-2. 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 바꿔치기된 API 재전송하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(), // => accessToken이 변경돼서 리렌더링 될 때 새로만들어짐
    cache: DEFAULT_CACHE, // 컴포넌트가 새로만들어져도 globalState는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
