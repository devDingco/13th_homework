import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  # 타입적는곳
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
    $youtubeUrl: String
    $zipcode: String
    $address: String
    $addressDetail: String
  ) {
    #전달할 변수 적는곳
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
        youtubeUrl: $youtubeUrl
        boardAddress: {
          zipcode: $zipcode
          address: $address
          addressDetail: $addressDetail
        }
      }
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
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
    $youtubeUrl: String
    $zipcode: String
    $address: String
    $addressDetail: String
  ) {
    # 전달할 변수 적는곳
    updateBoard(
      updateBoardInput: {
        title: $title
        contents: $contents
        youtubeUrl: $youtubeUrl
        boardAddress: {
          zipcode: $zipcode
          address: $address
          addressDetail: $addressDetail
        }
      }
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// export const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       _id
//       writer
//       title
//       contents
//       youtubeUrl
//       boardAddress {
//         address
//       }
//     }
//   }
// `;
