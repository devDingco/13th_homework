import { gql } from "@apollo/client";

// 서비스 정보 가져오기
export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($productId: ID!) {
    fetchTravelproduct(travelproductId: $productId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        address
      }
      buyer {
        _id
      }
      seller {
        _id
        name
        picture
      }
      soldAt
    }
  }
`;

// 문의하기 보내기
export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravcelproductQuestionInput: CreateTravelproductQuestionInput!
  ) {
    createTravelproductQuestion(
      createTravcelproductQuestionInput: $createTravcelproductQuestionInput
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

export const FETCH_TRAVEL_PRODUCT_QUESTION = gql`
  query fetchTravelproductQuestions($page: Int, $productId: ID!) {
    fetchTravelproductQuestions(page: $page, travelproductId: $productId) {
      contents
      user {
        name
      }
    }
  }
`;
