/** @format */

import { api } from '../config';

export default async function deleteBoard(boardId: number) {
	const response = await api.delete(`/board/${boardId}`);

	// return response.data;
}
