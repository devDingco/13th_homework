"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/22-01-access-token-store";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloHeaderSettingLocalStorage(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

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
    setAccessToken(localStorage.getItem("accessToken") ?? "");
  }, []);
  // const localstorageAccessToken = localStorage.getItem("accessToken");
  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // cache: new InMemoryCache(),  ===> accessToken이 변경돼서 리랜더되게 되면 새로만들어짐 기존데이터 지워짐
    cache: GLOBAL_STATE, // ===> 컴포넌트는 새로 만들어지게 돼도 글로벌스테이트는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
