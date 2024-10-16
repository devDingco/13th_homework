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
      writer
      title
      contents
      youtubeUrl
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      writer
      title
      contents
    }
  }
`;
