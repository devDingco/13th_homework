/** @format */

import { IApiResponse } from '@/models/apiResponse';
import { api } from '../config';

export default async function getAllBoards(): Promise<IApiResponse> {
	const response = await api.get('/board');

	return response.data;
}
