/** @format */

import { api, boardUrlEndPoint, commentUrlEndPoint } from '../../../config/axiosConfig';

export default async function deleteComment(boardId: string, commentId: string) {
	return await api.delete(`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}/${commentId}`);
}
