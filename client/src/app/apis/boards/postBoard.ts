/** @format */

import { ICreateFormBoard } from '@/models/formBoard';

import { api } from '../config';
import { IApiResponse } from '@/models/apiResponse';

export default async function postBoard(data: ICreateFormBoard): Promise<IApiResponse> {
	const response = await api.post('/board', data);

	return response.data;
}
