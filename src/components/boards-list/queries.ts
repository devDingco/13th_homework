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
    query fetchBoard($mynumber: ID!) {
        fetchBoard(boardId: $mynumber) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation deleteBoard($mynumber: ID!) {
        deleteBoard(boardId: $mynumber)
    }
`;
