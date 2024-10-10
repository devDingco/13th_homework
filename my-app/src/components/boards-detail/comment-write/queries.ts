import { gql } from "@apollo/client";

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
