/** @format */

import { api, boardUrlEndPoint, commentUrlEndPoint } from '../../../config/axios_config';

export default async function deleteComment(boardId: string, commentId: string) {
	return await api.delete(`${boardUrlEndPoint}/${boardId}${commentUrlEndPoint}/${commentId}`);
}
