import { gql } from "@apollo/client";

//답변 목록 조회
export const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS = gql`
  query fetchTravelproductQuestionAnswers(
    $page: Int
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
