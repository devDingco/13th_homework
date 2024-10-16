import { gql } from "@apollo/client";
import exp from "constants";

// 게시판 목록
export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

// 게시판 상세
export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        address
        zipcode
        addressDetail
      }
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
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
      likeCount
      dislikeCount
      images
      boardAddress {
        address
        zipcode
        addressDetail
      }
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
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
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(boardId: $id)
  }
`;

// 게시판 댓글

export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $boardCommentId
    ) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
