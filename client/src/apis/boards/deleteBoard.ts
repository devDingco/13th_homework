/** @format */

import { api } from '../config';
import { mutate } from 'swr';

export default async function deleteBoard(boardId: number, data) {
	try {
		const response = await api.delete(`/board/${boardId}`);

		if (response.data.statusCode === 200) {
			await mutate(
				'/api/board',
				data?.filter((board) => board.boardId !== boardId),
				false,
			);

			return true;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
	return false;
}
