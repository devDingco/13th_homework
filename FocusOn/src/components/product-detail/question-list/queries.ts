import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCT_QUESTION = gql`
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
    ) {
      _id
      contents
      user {
        name
      }
      createdAt
    }
  }
`;
