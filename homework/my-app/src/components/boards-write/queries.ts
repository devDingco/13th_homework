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
