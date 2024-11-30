import { gql } from "@apollo/client";

export const CREATE_SOLPLACE_LOG_INPUT = gql`
  mutation createSolplaceLog($createSolplaceLogInput: createSolplaceLogInput!) {
    createSolplaceLog(createSolplaceLogInput: $createSolplaceLogInput) {
      id
      title
      contents
      address
      lat
      lng
      images
    }
  }
`;
