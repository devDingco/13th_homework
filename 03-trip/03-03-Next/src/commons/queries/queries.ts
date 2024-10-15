"use client";
import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            boardAddress {
                _id
                zipcode
                address
                addressDetail
                createdAt
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

// boardAddress {
//     _id
//     zipcode
//     address
//     addressDetail
//     createdAt
//     updatedAt
//     deletedAt
// }
// user {
//     _id
//     email
//     name
//     picture
//     userPoint {
//         _id
//         amount
//         user
//         createdAt
//         updatedAt
//         deletedAt
//     }
//     createdAt
//     updatedAt
//     deletedAt
// }

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            createdAt
        }
    }
`;

export const FETCH_LIST = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
            _id
            writer
            title
            contents
            createdAt
        }
    }
`;

export const FETCH_COUNT = gql`
    query fetchBoardsCount {
        fetchBoardsCount
    }
`;

export const UPDATE_BOARD = gql`
    mutation updateBoard(
        $boardId: ID!
        $password: String
        $updateBoardInput: UpdateBoardInput!
    ) {
        updateBoard(
            boardId: $boardId
            password: $password
            updateBoardInput: $updateBoardInput
        ) {
            _id
            writer
            title
            contents
            updatedAt
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`;
