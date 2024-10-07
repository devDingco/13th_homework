import { gql } from "@apollo/client";

export const register = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      createdAt
      updatedAt
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
      # boardAddress {
      #   address
      #   zipcode
      #   addressDetail
      # }
    }
  }
`;
