import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export const CREATE_BOARD_COMMENT = gql`
  #타입 적는 곳
  mutation createBoardComment(
    $boardId: ID!
    $writer: String
    $password: String
    $contents: String!
    $rating: Float!
  ) {
    # 변수 적는 곳
    createBoardComment(
      boardId: $boardId
      createBoardCommentInput: {
        writer: $writer
        password: $password
        contents: $contents
        rating: $rating
      }
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

// -------------------위까지는 원래 등록하기 용도 이거 지울예정이고 gql로 수정하기 찾아야함

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $contents: String
    $rating: Float
    $password: String
    $boardCommentId: ID!
  ) {
    # 변수 적는 곳
    updateBoardComment(
      updateBoardCommentInput: { contents: $contents, rating: $rating }
      password: $password
      boardCommentId: $boardCommentId
    ) {
      # 리턴값
      _id
      writer
      contents
      rating
    }
  }
`;
