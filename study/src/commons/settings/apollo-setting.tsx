// 이미지 업로드를 위한 graphql 셋팅
// commons/settins/apollo-setting.tsx
// yarn add apollo-upload-client

"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSetting(props: IApolloUploadSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

  // 1. 프리랜더링 예제 - process.browser 방법
  // if (process.browser) {
  //   console.log("브라우저 환경이다!");
  // } else {
  //   console.log("서버 환경이다!");
  // }

  // 2. 프린랜더링 예제 - typeof window 방법
  // if (typeof window !== "undefined") {
  //   console.log("브라우저 환경이다!");
  // } else {
  //   console.log("서버 환경이다!");
  // }

  // 3. 프리랜더링 무시 - useEffect 방법
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // cache: new InMemoryCache(),
    // ★ useAccessToken이 변경되면서 리랜더링 되므로 기존 캐시가 날아가는 문제가 발생
    // 그러므로 전역으로 캐시를 만들어서 사용한다. 위에 GLOBAL_STATE 전역 변수 선언
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
