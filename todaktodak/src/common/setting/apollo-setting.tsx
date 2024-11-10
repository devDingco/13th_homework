import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  // NextAuth 세션에서 토큰 가져오기
  const session = await getSession();

  return {
    headers: {
      ...headers,
      authorization: session?.user?.accessToken
        ? `Bearer ${session.user.accessToken}`
        : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
