import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($updateBoardCommentInput: UpdateBoardCommentInput!, $password: String, $boardCommentId: ID!) {
    updateBoardComment(updateBoardCommentInput: $updateBoardCommentInput, password:$password, boardCommentId: $boardCommentId){
      _id
      writer
      contents
      rating
      user{
        _id
        name
        createdAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
