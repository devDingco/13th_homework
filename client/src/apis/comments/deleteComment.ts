/** @format */

import { api, boardUrlEndPoint, commentUrlEndPoint } from '../config';

export default async function deleteComment(boardId: string, commentId: string) {
	const response = await api.delete(
		`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}/${commentId}`,
	);
	console.log(response);
	return response;
}
