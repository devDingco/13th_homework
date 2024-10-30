"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloUploadSetting(props: IApolloSetting) {
  const uploadLink = createUploadLink({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

// 업로드 가능한 라이브러리를 받고 ApolloUploadSetting 안에 기능을 추가. => apollo-upload-client
// 아폴로 클라이언트 docs가면 다 있는 내용
// cd package.json파일이 있는 곳까지 이동 => yarn add apollo-upload-client

// mjs = module js 방식 / 현재 / import ,  export
// cjs = common js 방식 / 예전 / equire() , exports

// import 문장 에러문구 확인
// yarn add @types/apollo-upload-client --dev
// yarn add --dev @types/apollo-upload-client
// => ts도 되도록 추가 설치.
