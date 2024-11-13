import { ApolloError, ApolloQueryResult } from "@apollo/client";
import { gql, GraphQLClient } from "graphql-request";

export const RESTORE_ACCESS_TOKEN = gql`
    mutation restoreAccessToken {
        restoreAccessToken {
            accessToken
        }
    }
`;

interface T_token {
    restoreAccessToken: {
        accessToken: string;
    };
}

export const getAccessToken = async () => {
    try {
        const graphQLClient = new GraphQLClient("https://main-practice.codebootcamp.co.kr/graphql", {
            credentials: "include",
        });
        const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);

        const res = result as ApolloQueryResult<T_token>;
        const newToken = res.data.restoreAccessToken.accessToken;

        return newToken;
    } catch (error) {
        const err = error as ApolloError;
        console.log(err.message);
    }
};
