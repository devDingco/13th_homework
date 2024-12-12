import { gql } from "@apollo/client";

export const FETCH_SOLPLACE_LOG = gql`
  query fetchSolplaceLog($id: ID!) {
    fetchSolplaceLog(id: $id) {
      id
      title
      contents
      address
      lat
      lng
      images
      userId
      createdAt
    }
  }
`;
