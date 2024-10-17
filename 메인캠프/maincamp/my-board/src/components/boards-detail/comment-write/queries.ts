import { gql } from '@apollo/client';

const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $boardId: ID!
    $createBoardCommentInput: CreateBoardCommentInput!
  ) {
    createBoardComment(
      boardId: $boardId
      createBoardCommentInput: $createBoardCommentInput
    ) {
      _id
      writer
      contents
      rating
      createdAt
      rating
    }
  }
`;

const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $boardCommentId: ID!
    $password: String
    $updateBoardCommentInput: UpdateBoardCommentInput!
  ) {
    updateBoardComment(
      boardCommentId: $boardCommentId
      password: $password
      updateBoardCommentInput: $updateBoardCommentInput
    ) {
      _id
      writer
      contents
      rating
      updatedAt
    }
  }
`;
