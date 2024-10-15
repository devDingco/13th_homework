import { gql } from "@apollo/client";

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export { FETCH_BOARDS_COUNT };
