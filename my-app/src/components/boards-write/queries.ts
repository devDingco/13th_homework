import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  # 타입적는곳
  mutation createBoard_boardWrite(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
    $youtubeUrl: String
    $images: [String!]
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
        images: $images
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
      images
      boardAddress {
        _id
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
    $images: [String!]
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
        images: $images
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
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// 이미지 추가하기
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
