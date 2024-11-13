import { gql, GraphQLClient } from "graphql-request";

type RestoreAccessTokenResponse = {
  restoreAccessToken: {
    accessToken: string;
  };
};

const RESTORE_ACCESS_TOKEN = gql`
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
      {
        credentials: "include",
      }
    );
    const result = await graphQLClient.request<RestoreAccessTokenResponse>(
      RESTORE_ACCESS_TOKEN
    );
    const newAccessToken = result?.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
