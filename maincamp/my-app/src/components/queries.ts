import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
    query fetchBoards{
        fetchBoards {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const boardGraphql = gql`
  mutation createBoard($createBoardInput:CreateBoardInput!){
    createBoard(createBoardInput:$createBoardInput){
      _id
      writer
      title
      contents
      youtubeUrl
      images
      boardAddress{
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
      deletedAt
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
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

