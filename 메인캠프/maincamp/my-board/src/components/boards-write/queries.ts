import { gql } from '@apollo/client';

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

// 수정페이지
const EDIT_BOARD = gql`
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
      createdAt
      updatedAt
      images
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

//등록페이지
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
      images
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

// 파일 업로드
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      size
      createdAt
    }
  }
`;

// 검색
const FETCH_BOARDS_SEARCH = gql`
  query fetchBoardsSearch($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
