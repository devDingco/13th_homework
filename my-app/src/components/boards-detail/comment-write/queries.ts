import { gql } from "@apollo/client";

export const CREATE_BOARD_COMMENT = gql`
  #타입 적는 곳
  mutation createBoardComment(
    $writer: String
    $password: String
    $contents: String!
    $rating: Float!
  ) {
    # 변수 적는 곳
    createBoardComment(
      boardId: "6703a8585413b3002914cf06"
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
