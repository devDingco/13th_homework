import { gql } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export { FETCH_BOARDS, DELETE_BOARD, FETCH_BOARDS_COUNT };
