'use client';
import { gql } from '@apollo/client';

export const 나의그래프큐엘셋팅 = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            contents
            title
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

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`;
