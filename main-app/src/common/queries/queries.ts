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
            images
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
            images
            createdAt
            updatedAt
        }
    }
`;

export const FETCH_LIST = gql`
    query fetchBoards($page: Int, $search: String) {
        fetchBoards(page: $page, search: $search) {
            _id
            writer
            title
            contents
            createdAt
            updatedAt
        }
    }
`;

export const FETCH_COUNT = gql`
    query fetchBoardsCount {
        fetchBoardsCount
    }
`;

export const UPDATE_BOARD = gql`
    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {
        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {
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
            images
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
    mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
        createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {
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

export const UPDATE_COMMENT = gql`
    mutation updateBoardComment(
        $boardCommentId: ID!
        $password: String
        $updateBoardCommentInput: UpdateBoardCommentInput!
    ) {
        updateBoardComment(
            boardCommentId: $boardCommentId
            password: $password
            updateBoardCommentInput: $updateBoardCommentInput
        ) {
            _id
            writer
            contents
            rating
            createdAt
            updatedAt
        }
    }
`;

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            _id
            url
            size
            createdAt
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            _id
            email
            name
            userPoint {
                amount
            }
            createdAt
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const FETCH_USER = gql`
    query fetchUserLoggedIn {
        fetchUserLoggedIn {
            _id
            email
            name
            userPoint {
                amount
            }
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation logoutUser {
        logoutUser
    }
`;

export const CREATE_POINT = gql`
    mutation createPointTransactionOfLoading($paymentId: ID!) {
        createPointTransactionOfLoading(paymentId: $paymentId) {
            _id
            impUid
            amount
            balance
            status
            statusDetail
            createdAt
        }
    }
`;
