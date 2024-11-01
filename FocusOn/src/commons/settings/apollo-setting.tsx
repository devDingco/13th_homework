"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
