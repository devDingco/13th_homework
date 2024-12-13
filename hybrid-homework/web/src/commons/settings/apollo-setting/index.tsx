"use client";

// import { initMockAPI } from "@/mocks";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { useEffect, useState } from "react";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { onError } from "@apollo/client/link/error";
import { useDeviceSetting } from "../device-setting/hook";
import { getAccessToken } from "@/commons/libraries/get-access-token";
import { useAccessTokenStore } from "@/commons/stores/accesstoken-store";
import { useRefreshTokenStore } from "@/commons/stores/refreshtoken-store";
const inMemoryCache = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloSetting(props: IApolloSetting) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { refreshToken } = useRefreshTokenStore();
  const { fetchApp } = useDeviceSetting();

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken({ refreshToken }).then((newAccessToken) => {
              if (typeof newAccessToken === "string") {
                setAccessToken(newAccessToken);
                fetchApp({
                  query: "updateDeviceAuthForAccessTokenSet",
                  variables: { accessToken },
                });

                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
              }
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://main-hybrid.codebootcamp.co.kr/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: inMemoryCache,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded === false) return <></>;

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
