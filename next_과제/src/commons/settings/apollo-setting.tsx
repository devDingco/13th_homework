"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  // const testUrl = "http://main-example.codebootcamp.co.kr/graphql";
  const realUrl = "http://main-practice.codebootcamp.co.kr/graphql";
  const client = new ApolloClient({
    uri: realUrl,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
