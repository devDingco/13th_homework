import { gql } from "@apollo/client";

const CREATE_QUERY = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
      youtubeUrl
    }
  }
`;
const UPDATE_QUERY = gql`
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
      updatedAt
    }
  }
`;

export { CREATE_QUERY, UPDATE_QUERY };
