import { gql } from '@apollo/client';

export const UPDATE_BOARD_COMMENT = gql`
    mutation UpdateBoardComment(
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
            user {
                _id
                name
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;
