import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTIONS_OF_ALL = gql`
  query fetchPointTransactionsOfAll($search: String, $page: Int) {
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
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
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
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
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

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_ALL = gql`
  query fetchPointTransactionsCountOfAll {
    fetchPointTransactionsCountOfBuying
    fetchPointTransactionsCountOfLoading
    fetchPointTransactionsCountOfSelling
  }
`;

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

export const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading($search: String, $page: Int) {
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
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

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING = gql`
  query fetchPointTransactionsCountOfLoading {
    fetchPointTransactionsCountOfLoading
  }
`;

export const FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
  query fetchPointTransactionsOfSelling($search: String, $page: Int) {
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
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

export const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
  query fetchPointTransactionsCountOfSelling {
    fetchPointTransactionsCountOfSelling
  }
`;
