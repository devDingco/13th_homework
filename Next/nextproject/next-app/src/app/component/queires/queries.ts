import { gql } from "@apollo/client";

export const register = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      createdAt
      updatedAt
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      title
      contents
      createdAt
      updatedAt
      writer
      youtubeUrl
      boardAddress {
        address
        addressDetail
        zipcode
      }
    }
  }
`;
export const FetchBoard = gql`
  query fetchBoard($myboardId: ID!) {
    fetchBoard(boardId: $myboardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
      boardAddress {
        address
        zipcode
        addressDetail
      }
    }
  }
`;

export const Comment = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      contents
      createdAt
      writer
      rating
    }
  }
`;
export const FETCH_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      writer
      contents
      createdAt
      _id
      rating
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateBoardComment(
    $boardCommentId: ID!
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String!
  ) {
    updateBoardComment(
      boardCommentId: $boardCommentId
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
    ) {
      _id
      contents
      rating
      writer
      updatedAt
    }
  }
`;

export const DeleteBoard = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const FetchBoardsCount = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;
export const FetchBoards = gql`
  query fetchBoards($mypage: Int) {
    fetchBoards(page: $mypage) {
      writer
      contents
      title
      createdAt
      _id
    }
  }
`;
