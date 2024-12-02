"use client";

import { initMockAPI } from "@/mocks";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  const [isLoaded, setIsLoaded] = useState(false);
  const client = new ApolloClient({
    uri: "https://main-hybrid.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  // 위 실제 API주소로 요청을 보내는 대신, 미리 준비된 목데이터를 반환하는 환경을 설정합니다.
  // 실 데이터를 보고 싶으면 initMockAPI().then(() => {}) 함수를 무력화시키면 실제 데이터를 볼 수 있습니다.
  useEffect(() => {
    initMockAPI().then(() => {
      setIsLoaded(true);
    });
  }, []);

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  if (isLoaded === false) return <></>;

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
