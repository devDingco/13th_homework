/** @format */

import { api, boardUrlEndPoint } from '../../../config/axiosConfig';

import { wrapPromise } from '@/utils/wrapPromise';

export async function getBoard(boardId: number) {
	const response = await api.get(`${boardUrlEndPoint}/${boardId}`);
	return response.data.data;
}

export const boardResource = wrapPromise(getBoard(1));
