"use client";

import { gql } from "@apollo/client";

// 게시글 생성하기
export const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $password: String, $title: String!, $contents: String!) {
    createBoard(createBoardInput: { writer: $writer, password: $password, title: $title, contents: $contents }) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
    }
  }
`;

// 게시글 수정하기
export const UPDATE_BOARD = gql`
  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {
      _id
    }
  }
`;

// 데이터 불러오기
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;
