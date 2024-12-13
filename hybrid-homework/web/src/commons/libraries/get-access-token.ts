import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;
// refreshtoken 이 만료가 되면, accesstoken 재발급 받아줘!
export const getAccessToken = async ({ refreshToken }) => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://main-hybrid.codebootcamp.co.kr/graphql",
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    );
    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
