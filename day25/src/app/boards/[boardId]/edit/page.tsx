"use client";

import BoardsWrite from "_components/boards-write";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
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
			user {
				_id
				email
				name
				picture
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export default function BoardsDetailEditPage() {
	const params = useParams();
	const id = params.boardId;

	const { data } = useQuery(FETCH_BOARD, {
		variables: { boardId: id },
	});

	return <BoardsWrite isEdit={true} data={data} />;
}
