"use client"
import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
    children: React.ReactNode
}
export default function ApolloSetting(props: IApolloSetting) {
    const client = new ApolloClient({
        uri: "http://main-practice.codebootcamp.co.kr/graphql", //practice
        cache: new InMemoryCache()
    })    

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}
