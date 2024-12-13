import { gql } from "@apollo/client";

export const FETCH_SOLPLACE_LOGS = gql`
  query fetchSolplaceLogs($page: Int) {
    fetchSolplaceLogs(page: $page) {
      id
      title
      contents
      address
      images
      userId
      createdAt
    }
  }
`;
