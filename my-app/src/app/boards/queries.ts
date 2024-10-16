import { gql } from "@apollo/client";

export const FECTH_BOARDS = gql`
  query fetchBoards_boards($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;
