import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
  query fetchTravelproducts {
    fetchTravelproducts {
      _id
      name
      remarks
      contents
      price
      tags
      buyer {
        name
      }
    }
  }
`;
