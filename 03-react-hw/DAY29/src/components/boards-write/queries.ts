import { gql } from "@apollo/client";

// 게시글 생성을 위한 GraphQL 뮤테이션 쿼리
export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

// 게시글 수정을 위한
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
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

// 이미지 등록
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
    }
  }
`;
