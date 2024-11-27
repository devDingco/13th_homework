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
      // 성공하든 실패하든 로딩은 끝
      .finally(setIsLoaded);
  }, []);

  // error 링크
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러 존재 시, 토큰 만료 에러('UNAUTHENTICATED')인지 확인
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 토큰 만료 에러 시, 신규 토큰 발급
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToekn을 저정하고, 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken ?? "");
              // operation: 방금 실패한 쿼리
              // 기존 헤더에서 accessToken만 바꿔치기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization Bearer 만료된 토큰
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 바꿔치기된 API 재전송하기
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
