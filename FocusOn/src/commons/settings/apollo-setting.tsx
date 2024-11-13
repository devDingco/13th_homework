"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useEffect } from "react";
import { useAccessTokenStore } from "../stores/accessToken";
import { useLoadStore } from "../stores/load";
import { getAccessToken } from "../libraries/get-access-token";

const GLOBAL_CACHE = new InMemoryCache();

interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderAndErrorSettingRefresh(
  props: IApolloUploadSetting
) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 새로고침 시, refreshToken을 이용한 accessToken 자동 갱신
  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(setIsLoaded);
  }, []);

  // error 링크
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 에러 존재 시, 토큰 만료 에러('UNAUTHENTICATED')인지 확인
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 토큰 만료 에러 시, 신규 토큰 발급
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken ?? ""}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  // upload 링크
  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_CACHE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
