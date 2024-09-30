import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  # graphql 타입 지정
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 전달할 변수
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
