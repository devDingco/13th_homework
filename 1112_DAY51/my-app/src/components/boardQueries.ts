import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      images
      createdAt
      likeCount
      dislikeCount
      updatedAt
    }
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      title
      writer
      createdAt
    }
  }
`;
