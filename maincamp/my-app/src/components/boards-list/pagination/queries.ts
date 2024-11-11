import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards($mypage: Int, $pageSize: Int) {
    fetchBoards(page: $mypage, pageSize: $pageSize) {
      _id
      writer
      title
      contents
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query FetchBoardsCountDate(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
  ) {
    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
  }
`;
