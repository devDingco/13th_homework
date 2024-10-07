import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  # 타입적는곳
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
  ) {
    #전달할 변수 적는곳
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export const UPDATE_BOARD = gql`
  # 타입적는곳
  mutation updateBoard(
    $title: String
    $contents: String
    $password: String
    $boardId: ID!
  ) {
    # 전달할 변수 적는곳
    updateBoard(
      updateBoardInput: { title: $title, contents: $contents }
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
    }
  }
`;
