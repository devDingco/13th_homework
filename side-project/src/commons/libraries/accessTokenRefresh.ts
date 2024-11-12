import { gql, GraphQLClient } from 'graphql-request';

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const getAccessToken = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      'https://main-practice.codebootcamp.co.kr/graphql',
      { credentials: 'include' }
    );
    const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
    return result.restoreAccessToken.accessToken;
  } catch (error) {
    console.error('AccessToken 갱신 실패:', error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      'https://main-practice.codebootcamp.co.kr/graphql',
      { credentials: 'include' }
    );
    const result = await graphqlClient.request(LOGOUT_USER);
    return result.logoutUser;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    return false;
  }
};
