import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards(
    $mypage: Int
    $endDate: DateTime
    $startDate: DateTime
    $search: String
  ) {
    fetchBoards(
      page: $mypage
      endDate: $endDate
      startDate: $startDate
      search: $search
    ) {
      _id
      writer
      title
      images
      contents
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;
