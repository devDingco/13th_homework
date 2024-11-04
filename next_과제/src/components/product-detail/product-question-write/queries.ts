import { gql } from "@apollo/client";

export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
    }
  }
`;

export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation updateTravelproductQuestion(
    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
    $travelproductQuestionId: ID!
  ) {
    updateTravelproductQuestion(
      updateTravelproductQuestionInput: $updateTravelproductQuestionInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
    }
  }
`;
