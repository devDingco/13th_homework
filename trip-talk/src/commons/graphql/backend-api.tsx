import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(boardId: $id)
  }
`;
