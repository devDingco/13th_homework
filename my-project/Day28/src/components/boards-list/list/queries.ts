import { gql } from "@apollo/client";

const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export { FETCH_BOARDS, DELETE_BOARD };
