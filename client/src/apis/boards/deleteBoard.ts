/** @format */

import { api } from '../config';
// import { IApiResponse } from '@/models/apiResponse';

export default async function deleteBoard(boardId: number) {
	const response = await api.delete(`/board/${boardId}`);

	return response.data;
}
