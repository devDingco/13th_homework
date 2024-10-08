/** @format */

import { api, boardUrlEndPoint } from '../config';

export default async function deleteBoard(boardId: number) {
	try {
		const response = await api.delete(`${boardUrlEndPoint}/${boardId}`);

		if (response.data.statusCode === 200) {
			return true;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
	return false;
}
