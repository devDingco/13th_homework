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
import { getAccessToken } from "@/lib/get-access-token";
import { useEffect } from "react";
import { useLoadStore } from "../stores/load-store";

const GLOBAL_STATE = new InMemoryCache();
interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 3. 프리렌더링 무시 - useEffect 방법(refreshToken) 새로고침시 토큰유지
  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken ?? "");

              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: Bearer qklqkjdkjafsklj => 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2. 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", //민감한 정보 포함을 승인한다, 이게 있어야지 refreshToken을 쿠키에 못 담는다
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink, errorLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
