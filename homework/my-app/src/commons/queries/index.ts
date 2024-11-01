"use client";

import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($myCreateBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $myCreateBoardInput) {
      _id
      writer
      title
      contents
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
    $myUpdateBoardInput: UpdateBoardInput!
    $myPassword: String
    $myEditId: ID!
  ) {
    updateBoard(
      updateBoardInput: $myUpdateBoardInput
      password: $myPassword
      boardId: $myEditId
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      writer
      title
      contents
      youtubeUrl
      createdAt
      updatedAt
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
    }
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($mydelete: ID!) {
    deleteBoard(boardId: $mydelete)
  }
`;

// 댓글 그래프큐엘
export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
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
    }
  }
`;
