import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCTS_OF_THE_BEST = gql`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      remarks
      price
      tags
      images
      pickedCount
      soldAt
      deletedAt
    }
  }
`;
