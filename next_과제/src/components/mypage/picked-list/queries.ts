import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
  query fetchTravelproductsIPicked($search: String, $page: Int) {
    fetchTravelproductsIPicked(search: $search, page: $page) {
      _id
      name
      price
      seller {
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED = gql`
  query fetchTravelproductsCountIPicked {
    fetchTravelproductsCountIPicked
  }
`;
