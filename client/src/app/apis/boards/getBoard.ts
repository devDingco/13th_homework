/** @format */

import { api } from '../config';
import { IApiResponse } from '@/models/apiResponse';

export default async function getBoard(boardId: number): Promise<IApiResponse> {
	const response = await api.get(`/board/${boardId}`);

	console.log(response);

	return response.data;
}
