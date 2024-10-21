"use client";

import { gql } from "@apollo/client";

export const CREATE_COMMIT = gql`
  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {
      _id
      writer
      contents
      createdAt
      updatedAt
    }
  }
`;
