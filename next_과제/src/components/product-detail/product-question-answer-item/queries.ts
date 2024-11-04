import { gql } from "@apollo/client";

export const DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation deleteTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
  ) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;
