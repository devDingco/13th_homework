import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  //  deleteUser할때 cors발생해서 일단 주석..
  // headers: {
  //   "Apollo-Require-Preflight": "true",
  // },
  headers: {
    "Content-Type": "application/json",
  },
});

const authLink = setContext(async (_, { headers }) => {
  try {
    // NextAuth 세션에서 토큰 가져오기
    const session = await getSession();

    console.log("현재 session:", session);

    return {
      headers: {
        ...headers,
        authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
        // CORS 관련 헤더 추가
        // "Content-Type": "application/json",
        // Accept: "application/json"
      },
    };
  } catch (error) {
    console.error("Auth link error:", error);
    return { headers };
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
  // 항상 최신 데이터를 가져오기
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
