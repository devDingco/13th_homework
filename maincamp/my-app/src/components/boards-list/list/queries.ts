import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
    query fetchBoards($mypage: Int){
        fetchBoards (page: $mypage){
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
