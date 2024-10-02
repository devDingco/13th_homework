/** @format */

import { api } from '../config';

export default async function getAllBoards() {
	try {
		const result = await api.get('/board');

		if (result.data.statusCode === 200) {
			return result.data.data;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
