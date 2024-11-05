"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/accessToken";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../libraries/get-access-token";
import { useLoadStore } from "../stores/load";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
        setIsLoaded();
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
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
