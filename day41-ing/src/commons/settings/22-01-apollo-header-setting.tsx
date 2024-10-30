"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/22-01-access-token-store";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloHeaderSetting(props: IApolloSetting) {
  const { accessToken } = useAccessTokenStore(); //여기서는 사용할 것

  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // cache: new InMemoryCache(), // => accessToken이 변경돼서 리렌더될 때 새로만들어짐
    cache: GLOBAL_STATE, // => 컴포넌트는 새로만들어져도, globalState는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

// 아폴로업로드 + api요청 시 헤더에 액세스토큰 넣어서 보내기
// 글로벌스테이트(zustand)에 저장한 토큰을 여기로 가져와서 씀

//state가 변해서 ApolloHeaderSetting이 새로 실행되더라도 GLOBAL_STATE = new InMemoryCache();는 그대로 유지 (위로 뺐음)
