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
            boardAddress {
                zipcode
                address
                addressDetail
            }
            createdAt
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
            youtubeUrl
            boardAddress {
                zipcode
                address
                addressDetail
            }
            createdAt
            updatedAt
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
            youtubeUrl
            boardAddress {
                zipcode
                address
                addressDetail
            }
            updatedAt
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`;

export const CREATE_COMMENT = gql`
    mutation createBoardComment(
        $boardId: ID!
        $createBoardCommentInput: CreateBoardCommentInput!
    ) {
        createBoardComment(
            boardId: $boardId
            createBoardCommentInput: $createBoardCommentInput
        ) {
            _id
            writer
            contents
            rating
            createdAt
        }
    }
`;

export const FETCH_COMMENTS = gql`
    query fetchBoardComments($page: Int, $boardId: ID!) {
        fetchBoardComments(page: $page, boardId: $boardId) {
            _id
            writer
            contents
            rating
            createdAt
        }
    }
`;
