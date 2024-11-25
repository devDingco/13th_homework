import { gql } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCTS = gql`
  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      tags
      price
      images
      seller {
        name
        picture
      }
      pickedCount
    }
  }
`;

export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
        deletedAt
      }
      seller {
        name
        picture
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelProduct(
    $createTravelproductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
    }
  }
`;

export const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct(
    $updateTravelproductInput: UpdateTravelproductInput!
    $travelproductId: ID!
  ) {
    updateTravelproduct(
      updateTravelproductInput: $updateTravelproductInput
      travelproductId: $travelproductId
    ) {
      _id
    }
  }
`;

export const FETCH_TRAVELPRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
    ) {
      _id
      contents
      user {
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRAVELPRODUCT_QUESTION = gql`
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

export const UPDATE_TRAVELPRODUCT_QUESTION = gql`
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

export const DELETE_TRAVELPRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
    )
  }
`;

export const fetchTravelproductQuestionAnswers = gql`
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
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
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

export const UPDATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
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

export const DELETE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation deleteTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
  ) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;

export const TOGGLE_TRAVELPRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
      impUid
      amount
    }
  }
`;

export const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;
