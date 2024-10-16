import { gql } from "@apollo/client";

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

export { FETCH_BOARD_COMMENTS };
