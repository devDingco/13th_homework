import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
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
    }
  }
`;

export const DELETE_BOARD = gql`
  # mutation deleteBoard($boardId: ID!): 서버에게 "이 ID를 가진 게시물을 삭제하라"라고 요청하는 명령
  #   // 뮤테이션 변수 이름 (타입지정)
  # $boardId: 삭제할 게시물의 ID를 넘겨주기 위해서 변수를 사용
  mutation deleteBoard($boardId: ID!) {
    # // 백엔드에서 정해진 함수 이름 규칙
    deleteBoard(boardId: $boardId)
  }
`;
