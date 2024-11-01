"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useEffect } from "react";
import { useAccessTokenStore } from "../stores/access-token-store";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloHeaderSettingLocalStorage(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

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
