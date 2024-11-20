import { RestoreAccessTokenDocument } from "@/commons/gql/graphql";
import { GraphQLClient } from "graphql-request";

type RestoreAccessTokenResponse = {
  restoreAccessToken: {
    accessToken: string;
  };
};

export const getAccessToken = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      "https://main-practice.codebootcamp.co.kr/graphql",
      { credentials: "include" }
    );
    const result = await graphqlClient.request<RestoreAccessTokenResponse>(
      RestoreAccessTokenDocument
    );
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    console.log(error);
  }
};
