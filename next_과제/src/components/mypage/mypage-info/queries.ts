import { gql } from "@apollo/client";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
        # user
        createdAt
        updatedAt
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
