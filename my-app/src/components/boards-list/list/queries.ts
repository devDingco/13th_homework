import { gql, useQuery } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards_list($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
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
