import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
    query fetchBoards(
      $endDate: DateTime
      $startDate: DateTime
      $search: String
      $mypage: Int
    ){
        fetchBoards (
          endDate: $endDate
          startDate: $startDate
          search: $search
          page: $mypage
        ){
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
