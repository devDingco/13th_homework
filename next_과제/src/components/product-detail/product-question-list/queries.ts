import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
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

// 내가 작성한 게시글인지 확인하기 위해 사용
export const FETCH_TRAVEL_PRODUCT_OF_MINE = gql`
  query fetchTravelproductOfMine {
    fetchUserLoggedIn {
      _id
    }
  }
`;
