import { gql } from '@apollo/client';

export const UPDATE_BOARD_COMMENT = gql`
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
			writer
			contents
			rating
			createdAt
			updatedAt
			deletedAt
		}
	}
`;
