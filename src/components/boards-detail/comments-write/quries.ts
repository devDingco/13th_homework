import { gql } from '@apollo/client';

// 댓글작성 쿼리
export const FETCH_BOARD_CREATE_COMMENT = gql`
    mutation createBoardComment(
        $createBoardCommentInput: CreateBoardCommentInput!
        $boardId: ID!
    ) {
        createBoardComment(
            createBoardCommentInput: $createBoardCommentInput
            boardId: $boardId
        ) {
            _id
            writer
            contents
            rating
        }
    }
`;

// 댓글 조회 쿼리
export const FETCH_BOARD_COMMENTS = gql`
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

// 댓글 수정 쿼리
export const UPDATE_BOARD_COMMENTS = gql`
    mutation updateBoardComment(
        $updateBoardCommentInput: UpdateBoardCommentInput!
        $password: String
        $boardCommentId: ID!
    ) {
        updateBoardComment(
            updateBoardCommentInput: $updateBoardCommentInput
            password: $password
            boardCommentId: $boardCommentId
        ) {
            _id
        }
    }
`;
