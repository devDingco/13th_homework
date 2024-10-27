import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $mypage: Int
    $search: String
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      page: $mypage
      search: $search
    ) {
      _id
      title
      writer
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
