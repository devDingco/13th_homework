import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      _id
      writer
      title
      contents
    }
  }
`;
