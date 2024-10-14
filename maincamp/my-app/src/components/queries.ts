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

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
        _id
        writer
        title
        contents
        createdAt
        youtubeUrl
        likeCount
        dislikeCount
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