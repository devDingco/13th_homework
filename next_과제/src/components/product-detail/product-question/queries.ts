import { gql } from "@apollo/client";

export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelProductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
  ) {
    createTravelProductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
    ) {
      _id
    }
  }
`;

// export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
//   mutation updateTravelProductQuestion(
//     $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
//     $travelproductQuestionId: ID!
//   ) {
//     updateTravelProductQuestion(
//       updateTravelproductQuestionInput: $updateTravelproductQuestionInput
//       travelproductQuestionId: $travelproductQuestionId
//     ) {
//       _id
//     }
//   }
// `;

// export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
//   mutation deleteTravelProductQuestion($travelproductQuestionId: ID!) {
//     deleteTravelProductQuestion(travelproductQuestionId: $travelproductQuestionId) {
//       _id
//     }
//   }
// `;

// export const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
//   mutation createTravelProductQuestionAnswer(
//     $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
//   ) {
//     createTravelProductQuestionAnswer(
//       createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
//     ) {
//       _id
//     }
//   }
// `;

// export const UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
//   mutation updateTravelProductQuestionAnswer(
//     $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
//     $travelproductQuestionAnswerId: ID!
//   ) {
//     updateTravelProductQuestionAnswer(
//       updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
//       travelproductQuestionAnswerId: $travelproductQuestionAnswerId
//     ) {
//       _id
//     }
//   }
// `;

// export const DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
//   mutation deleteTravelProductQuestionAnswer($travelproductQuestionAnswerId: ID!) {
//     deleteTravelProductQuestionAnswer(travelproductQuestionAnswerId: $travelproductQuestionAnswerId) {
//       _id
//     }
//   }
// `;

// export const FETCH_TARVEL_PRODUCT_QUESTIONS = gql`
//   query fetchTravelProductQuestions($page:Int $travelproductId: ID!) {
//     fetchTravelProductQuestions(page:$page travelproductId: $travelproductId) {
//       _id
//       writer
//       contents
//       createdAt
//       updatedAt
//       questionAnswer {
//         _id
//         writer
//         contents
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;
