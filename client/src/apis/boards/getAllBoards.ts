/** @format */

import { api, boardUrlEndPoint } from '../config';

export default async function getAllBoards() {
	try {
		const result = await api.get(boardUrlEndPoint);

		if (result.data.statusCode === 200) {
			return result.data.data;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
