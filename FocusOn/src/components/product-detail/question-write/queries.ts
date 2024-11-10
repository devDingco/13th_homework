import { gql } from "@apollo/client";

// 문의하기 보내기
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
      contents
      user {
        name
      }
      createdAt
    }
  }
`;
