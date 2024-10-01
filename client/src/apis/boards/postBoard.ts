/** @format */

import { IApiResponseData } from '@/models/apiResponse';
import { ICreateFormBoard } from '@/models/board.type';
import { api } from '../config';

export default async function postBoard(data: ICreateFormBoard): Promise<IApiResponseData | null> {
	try {
		const response = await api.post('/board', data);
		if (response.data.statusCode === 201) {
			return response.data.data;
		}
		return null;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
