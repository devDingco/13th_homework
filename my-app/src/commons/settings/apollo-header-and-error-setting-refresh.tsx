"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/access.token-store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { headers } from "next/headers";
import { getAccessToken } from "../libraries/get-access-token";
import { useLoadStore } from "../stores/load-store";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderAndErrorSettingRefresh(
  props: IApolloUploadSetting
) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 프리렌더링 무시 - useEffect 방법 (새로고침시 필요)
  useEffect(() => {
    // 로컬스토리지로 하는 임시 방식
    // setAccessToken(localStorage.getItem("accessToken") ?? "");

    // 리프레시토큰으로 하는 방식
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(() => {
        console.log("AccessToken after fetch:", accessToken);
        setIsLoaded();
      });
  }, []);

  // const localStorageAccessToken = localStorage.getItem("accessToken");

  // graphQLErrors => 에러들 중 토큰만료에러가 있는지 확인 해줌
  // operation => 엑세스 토큰 바꿔치기 해줌
  // forward => 재요청 해줌
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. 리프레시토큰으로 엑세스토큰 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken을 저장하고, 방금 실패한 쿼리 정보 수정하기
              // setContext() => 추가하는거 , getContext() => 가져오는거
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 이 안에 만료된 토큰이 들어있는 Authorizetion이 있는데 키값이 같으면 마지막꺼 덮어씀
                  Authorization: `Bearer ${newAccessToken}`, // 토큰만 새걸로 교체
                },
              });
            })
          ).flatMap(() => forward(operation)); // 4. 바꾼 API 재시도 하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(), => accessToken이 변경돼서 리렌더될 때 새로 만들어짐
    cache: GLOBAL_STATE, // => 컴포넌트는 새로 만들어져도, globalState는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
