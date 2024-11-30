import { gql } from "@apollo/client";

export const FETCH_SOLPLACE_LOG = gql`
  query fetchSolplaceLog($id: ID!) {
    fetchSolplaceLog(id: $id) {
      id
      images
      userId
      title
      contents
      address
      lat
      lng
    }
  }
`;
