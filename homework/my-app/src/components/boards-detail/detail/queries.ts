"use client";

import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      writer
      title
      contents
    }
  }
`;
