import { gql, GraphQLClient } from "graphql-request";

export const RESTORE_ACCESS_TOKEN = gql`
    mutation restoreAccessToken {
        restoreAccessToken {
            accessToken
        }
    }
`;

export const getAccessToken = async () => {
    try {
        const graphQLClient = new GraphQLClient(
            "https://main-practice.codebootcamp.co.kr/graphql",
            { credentials: "include" },
        );

        const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
        const newToken = result.restoreAccessToken.accessToken;

        return newToken;
    } catch (error) {
        console.log(error);
    }
};
