/** @format */
'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACK_GRAPHQL_URL,
	cache: new InMemoryCache(),
});

export default client;
