import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      # travelproduct
      # user
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
