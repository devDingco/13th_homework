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
import { getAccessToken } from "../libraries/get-access-token";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token ?? "");
    }
  }, []);

  // RefreshToken 관련 setting
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const error of graphQLErrors) {
        if (error.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              localStorage.setItem("accessToken", newAccessToken ?? "");

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

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    // ! : uploadLink 요청을 보낼 때 uri 경로를 https로 변경해준다.
    // ! : 민감한 정보 포함을 승인하기 위해 추가함. 없다면 쿠키에 담겨있는 것들을 백엔드로 전송할 수 없음(refreshToken 포함)
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
