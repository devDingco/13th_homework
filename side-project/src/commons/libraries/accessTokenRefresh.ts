import { gql, GraphQLClient } from 'graphql-request';

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessTokenRefresh = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      'https://main-practice.codebootcamp.co.kr/graphql',
      { credentials: 'include' }
    );
    const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    console.log('refreshToken을 받아오지 못함', error);
  }
};
