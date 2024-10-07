import { gql } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($board_id: ID!) {
    deleteBoard(boardId: $board_id)
  }
`;

export { FETCH_BOARDS, DELETE_BOARD };
