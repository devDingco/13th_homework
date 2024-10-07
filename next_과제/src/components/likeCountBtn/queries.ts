import { gql } from "@apollo/client";

export const FETCH_LIKECOUNT = gql`
  query fetchBoardLikeCount($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      likeCount
      dislikeCount
    }
  }
`;

export const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;
