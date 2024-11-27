import { GraphQLClient } from "graphql-request";
import { RestoreAccessTokenDocument } from "../graphql/graphql";

type RestoreAccessTokenResponse = {
  restoreAccessToken: {
    accessToken: string;
  };
};

export const getAccessToken = async () => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://main-practice.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    );
    const result = await graphQLClient.request<RestoreAccessTokenResponse>(
      RestoreAccessTokenDocument
    );
    const newAccessToken = result?.restoreAccessToken.accessToken;
    console.log(newAccessToken);
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
