"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { onError } from "@apollo/client/link/error";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { getAccessToken } from "@/commons/libs/get-access-token";
import { useLoadStore } from "@/commons/stores/load-store";
import { useEffect } from "react";

const cache = new InMemoryCache();
interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloUploadSetting(props: IApolloUploadSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore(); // 로딩 상태를 저장하는 스토어

  useEffect(() => {
    // 1. 앱이 처음 로드될 때 accessToken을 가져오기
    // 2. accessToken이 있으면 setAccessToken으로 저장하기 (없으면 빈 문자열로 저장)
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken ?? "");

              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: Bearer qklqkjdkjafsklj => 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2. 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`,
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: cache,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
