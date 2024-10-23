import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying($search: String, $page: Int) {
    fetchPointTransactionsOfBuying(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      # travelproduct {
      #   _id
      #   name
      #   remarks
      #   contents
      #   price
      #   tags
      #}
      user {
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
  query fetchPointTransactionsCountOfBuying {
    fetchPointTransactionsCountOfBuying
  }
`;
