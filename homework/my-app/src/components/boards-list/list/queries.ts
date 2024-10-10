import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {
      _id
      writer
      title
      images
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
