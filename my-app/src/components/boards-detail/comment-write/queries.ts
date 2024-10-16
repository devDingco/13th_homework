import { gql } from "@apollo/client";

const CREATE_BOARD_COMMENT = gql`
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
    }
  }
`;

const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      createdAt
      rating
      updatedAt
    }
  }
`;

const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $password: String
    $boardCommentId: ID!
    $updateBoardCommentInput: UpdateBoardCommentInput!
  ) {
    updateBoardComment(
      password: $password
      boardCommentId: $boardCommentId
      updateBoardCommentInput: $updateBoardCommentInput
    ) {
      _id
      writer
      contents
      rating
      updatedAt
      createdAt
    }
  }
`;
export { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT };
