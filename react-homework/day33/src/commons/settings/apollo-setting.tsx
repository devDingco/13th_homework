"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
  children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACK_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
