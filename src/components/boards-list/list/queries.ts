'use client';
import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
    query fetchBoards($mypage: Int) {
        fetchBoards(page: $mypage) {
            _id
            writer
            title
            contents
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
            images
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
export const FETCH_BOARDS_COUNT = gql`
    # 위에 fetchBoardsCount 이 없으면 codegen 에러 남, 붙이는걸 추천
    query fetchBoardsCount {
        fetchBoardsCount
    }
`;
