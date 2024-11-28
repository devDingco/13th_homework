"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"; // 에러 처리를 위한 onError 추가
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";
import { useEffect } from "react";
import { getAccessToken } from "@/commons/lib/26-01-get-access-token"; // 액세스 토큰을 가져오는 함수
import { useLoadStore } from "@/commons/stores/26-02-load-strore";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloUploadSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSetting(props: IApolloUploadSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore(); // 로딩 상태를 변경하기 위한 함수
  useEffect(() => {
    // 임시 방식
    // setAccessToken(localStorage.getItem("accessToken") ?? "");

    // 실무 방식
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken ?? "");
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // graphQLErrors : 서버에서 내려온 에러
    // operation : 현재 실행중인 operation
    // forward : 다음으로 실행할 함수

    // 1. 에러가 있는지 확인
    if (typeof graphQLErrors !== "undefined") {
      // 1-1. 에러들을 하나씩 확인하는데
      for (const err of graphQLErrors) {
        // 1-2. "UNAUTHENTICATED" 엑세트 토큰 만료 에러 인지 확인
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 1-3. 리프레시 토큰으로 새 액세스 토큰 발급받기
          // 여기서 useMutation을 사용하면 안된다. 왜냐하면 useMutation은 컴포넌트가 렌더링 될때만 실행되기 때문이다.

          // 그러므로 useMutation 대신에 사용할수 있는 방법이 두가지가 있다.
          // 1.fetch,axios 등을 사용하여 요청을 보내는 방법

          // ----여기서부터
          // 2.graphql-request를 사용하여 요청을 보내는 방법
          // const graphqlClient = new GraphQLClient(
          //   "https://main-practice.codebootcamp.co.kr/graphql"
          // );
          // const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
          // const newAccessToken = result.restoreAccessToken.accessToken;
          // ----여기까지 분리하여 26-01-get-access-token.ts 파일(getAccessToken())로 만들어서 사용한다.
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 1-4. 새 액세스 토큰을 글로벌스테이트에 저장하고 새 액세스 토큰으로 기존 요청의 헤더만 바꿔준다.
              setAccessToken(newAccessToken ?? "");
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 기존 헤더
                  Authorization: `Bearer ${newAccessToken ?? ""}`, // 헤더에서 바뀌는 부분인 Authorization만 바꿔준다.
                },
              });
            })
          ).flatMap(() => forward(operation)); // 1-5. 바뀐 헤더로 요청을 재시도한다.
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
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
