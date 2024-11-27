"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/22-01-access-token-store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../libraries/26-01-get-access-token";
import { useLoadStore } from "../stores/26-02-load-store";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloHeaderAndErrorSettingRefresh(
  props: IApolloSetting
) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 1. 프리랜더링 에제 - process.browser 방법
  // if (process.browser) {
  //   console.log("브라우저임");
  // } else {
  //   console.log("프론엔드 서버 즉 yarn dev 프로그램 내부이다");
  // }

  // 2. 프리랜더링 예제 - typeof window 방법
  // if (typeof window !== "undefined") {
  //   console.log("브라우저임");
  // } else {
  //   console.log("프론엔드 서버 즉 yarn dev 프로그램 내부이다");
  // }

  // 3. 프리랜더링 무시 - useEffect
  useEffect(() => {
    // 3-1.임시방식
    // setAccessToken(localStorage.getItem("accessToken") ?? "");
    // 3-2. refreshToken 방식
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
        setIsLoaded();
      })
      .finally(setIsLoaded);
  }, []);
  // const localstorageAccessToken = localStorage.getItem("accessToken");

  //graphQLErrors - 토큰만료 에러가 있는지 찾기 (UNAUTHENTICATED - 이게 토큰만료임 이게 있는지 찾음됨)
  // operation - 토큰 바꿔치기
  // forward- 재요청
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치(UNAUTHENTICATED - 이게 토큰만료임 이게 있는지 찾음됨)
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken을 저장하고, 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
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
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(),  ===> accessToken이 변경돼서 리랜더되게 되면 새로만들어짐 기존데이터 지워짐
    cache: GLOBAL_STATE, // ===> 컴포넌트는 새로 만들어지게 돼도 글로벌스테이트는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
