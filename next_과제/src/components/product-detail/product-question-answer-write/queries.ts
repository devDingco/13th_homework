import { gql } from "@apollo/client";

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

export const UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation updateTravelproductQuestionAnswer(
    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
    $travelproductQuestionAnswerId: ID!
  ) {
    updateTravelproductQuestionAnswer(
      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    ) {
      _id
    }
  }
`;
