import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  # graphql 타입 지정
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 전달할 변수
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      createdAt
    }
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
      writer
      createdAt
    }
  }
`;
