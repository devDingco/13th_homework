import { gql } from "@apollo/client";

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
    )
  }
`;
