import { gql } from "@apollo/client";

export const CREATE_BOARD_COMMENT = gql`
  mutation CreateBoardComment(
    $boardId: ID!
    $writer: String
    $password: String
    $contents: String!
    $rating: Float!
  ) {
    createBoardComment(
      boardId: $boardId
      createBoardCommentInput: {
        writer: $writer
        password: $password
        contents: $contents
        rating: $rating
      }
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

export const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!) {
    fetchBoardComments(page: 1, boardId: $boardId) {
      _id
      writer
      contents
      rating
      user {
        picture
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
