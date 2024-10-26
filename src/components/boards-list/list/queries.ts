'use client';
import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
    query {
        fetchBoards {
            _id
            writer
            title
            contents
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
            likeCount
            dislikeCount
            boardAddress {
                _id
                zipcode
                address
                addressDetail
            }
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`;
