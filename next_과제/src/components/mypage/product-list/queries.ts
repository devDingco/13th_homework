import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCTS_I_BOUGHT = gql`
  query fetchTravelproductsIBought($search: String, $page: Int) {
    fetchTravelproductsIBought(search: $search, page: $page) {
      _id
      name
      price
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_TRAVEL_PRODUCTS_COUNT_I_BOUGHT = gql`
  query fetchTravelproductsCountIBought {
    fetchTravelproductsCountIBought
  }
`;
