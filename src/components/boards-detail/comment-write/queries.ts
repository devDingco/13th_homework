import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment(
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
      updatedAt
      deletedAt
    }
  }
`;
