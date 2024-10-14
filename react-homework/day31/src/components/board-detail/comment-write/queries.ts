import { gql } from "@apollo/client";

// mutation {
//   createBoardComment(
//     createBoardCommentInput: {
//     writer:"댓글"
//     password: "1234"
//     contents: "우와"
//     rating: 1 # 별점
//     }
//   	boardId: "6703b4625413b3002914cf1b"
//   ) {
//     _id, writer, contents, rating, createdAt
//   }
// }

export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;
