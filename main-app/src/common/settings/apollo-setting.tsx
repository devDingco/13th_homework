"use client";

import { ApolloClient, ApolloLink, ApolloProvider, fromPromise, InMemoryCache } from "@apollo/client";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useTokenStore } from "../stores/useTokenStore";
import { useEffect } from "react";

import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../utils/getAccessToken";
import { useLoadStore } from "../stores/useLoadStore";

const GLOBAL_STATE_CACHE = new InMemoryCache();

interface IApolloSetting {
    children: React.ReactNode;
}
export default function ApolloSetting(props: IApolloSetting) {
    const { token, setToken } = useTokenStore();
    const { setIsLoaded } = useLoadStore();

    useEffect(() => {
        getAccessToken()
            .then((newToken) => {
                if (newToken) setToken(newToken);
            })
            .finally(setIsLoaded);
    }, []);

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
        if (typeof graphQLErrors !== "undefined") {
            for (const error of graphQLErrors) {
                if (error.extensions?.code === "UNAUTHENTICATED") {
                    return fromPromise(
                        getAccessToken().then((newToken) => {
                            setToken(newToken);
                            const newHeader = {
                                ...operation.getContext().headers,
                                Authorization: `Bearer ${newToken}`,
                            };

                            operation.setContext({
                                headers: newHeader,
                            });
                        }),
                    ).flatMap(() => forward(operation));
                }
            }
        }
    });

    const uploadLink = createUploadLink({
        uri: "https://main-practice.codebootcamp.co.kr/graphql",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
    });

    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, uploadLink]),
        cache: GLOBAL_STATE_CACHE,
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
