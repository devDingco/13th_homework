import { gql } from "@apollo/client";

export const FETCH_BOARDS_COUNT = gql`
  query FetchBoardsCountDate(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
  ) {
    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
  }
`;
