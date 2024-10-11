import { gql } from "@apollo/client";

// 게시글 생성
export const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

// 게시글 삭제
export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// 게시글 수정
export const UPDATE_BOARD = gql`
  mutation UpdateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      title
      contents
      updatedAt
    }
  }
`;

// 해당 게시글 불러오기
export const FETCH_BOARD = gql`
  query FetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// 게시글 목록 불러오기
export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
