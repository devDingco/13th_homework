import { gql } from "@apollo/client";

// 게시물 조회 -> detail페이지 이동
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
      }
      user {
        _id
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// 게시물 조회(전체) -> 게시물 목록
export const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      title
      writer
      createdAt
    }
  }
`;
