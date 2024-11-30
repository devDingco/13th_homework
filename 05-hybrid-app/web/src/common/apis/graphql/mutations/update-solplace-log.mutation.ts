import { gql } from "@apollo/client";

export const UPDATE_SOLPLACE_LOG = gql`
  mutation updateSolplaceLog(
    $id: ID!
    $updateSolplaceLogInput: UpdateSolplaceLogInput!
  ) {
    updateSolplaceLog(
      id: $id
      updateSolplaceLogInput: $updateSolplaceLogInput
    ) {
      id
      title
      contents
      address
      lat
      lng
      images
      userId
    }
  }
`;
