import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
	query fetchBoards($page: Int, $search: String) {
		fetchBoards(page: $page, search: $search) {
			_id
			writer
			title
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
