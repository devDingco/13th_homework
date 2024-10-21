import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!) {
    fetchBoardComments(page: 1, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;
