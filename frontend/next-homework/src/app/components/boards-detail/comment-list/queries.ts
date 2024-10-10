"use client";

import { gql } from "@apollo/client";

export const FETCH_COMMITS = gql`
  query fetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      user {
        name
        picture
      }
    }
  }
`;
