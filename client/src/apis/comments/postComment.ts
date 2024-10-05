/** @format */

import { api } from '../config';

export default async function postComment(data, boardId) {
	try {
		const result = await api.post(`/board/${boardId}/comment`, data);
		console.log(result);
	} catch (error) {
		console.log(error.response.data.validationErrors);
		return error;
	}
}
