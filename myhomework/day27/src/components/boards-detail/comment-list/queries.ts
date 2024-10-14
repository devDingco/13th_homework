"use clinet";
import { gql } from "@apollo/client";

export const fectchComment = gql`
  query FetchComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;
