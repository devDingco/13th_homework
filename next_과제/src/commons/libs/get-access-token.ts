// get-access-token.ts
import { RestoreAccessTokenDocument } from "../graphql/graphql";
import { GraphQLClient } from "graphql-request";

export const getAccessToken = async () => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://main-practice.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    );
    const result = await graphQLClient.request(RestoreAccessTokenDocument);
    const newAccessToken = result?.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
