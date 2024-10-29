"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useEffect } from "react";

const cache = new InMemoryCache();
interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloUploadSetting(props: IApolloUploadSetting) {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      useAccessTokenStore.getState().setAccessToken(accessToken);
    }
  }, []);

  const { accessToken } = useAccessTokenStore();
  const uploadLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: cache,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
