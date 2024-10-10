import { gql } from "@apollo/client";

export const Comment = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      contents
      createdAt
      writer
      rating
    }
  }
`;
export const FETCH_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      writer
      contents
      createdAt
      _id
      rating
    }
  }
`;
