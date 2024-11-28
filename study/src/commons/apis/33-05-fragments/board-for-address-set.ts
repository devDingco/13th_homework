import { gql } from "@apollo/client";

export const BOARD_FOR_ADDRESS_SET = gql`
  fragment BoardForAddressSet on Board {
    boardAddress {
      address
      addressDetail
      zipcode
    }
  }
`;
