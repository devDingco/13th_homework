"use client";

import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useTokenStore } from "../stores/useTokenStore";

const GLOBAL_STATE_CACHE = new InMemoryCache();

interface IApolloSetting {
    children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
    const { token } = useTokenStore();

    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        headers: { Authorization: `Bearer ${token}` },
    });
    const client = new ApolloClient({
        link: ApolloLink.from([uploadLink]),
        cache: GLOBAL_STATE_CACHE,
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
