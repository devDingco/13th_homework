import { gql } from "@apollo/client";

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
    )
  }
`;

export const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation createTravelproductQuestionAnswer(
    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
    $travelproductQuestionId: ID!
  ) {
    createTravelproductQuestionAnswer(
      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
    }
  }
`;
