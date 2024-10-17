/** @format */
'use server';

import { IApiResponse } from '@/models/apiResponse';
import { IRequestComment } from '@/models/comment.type';
import { api } from '../config';

export default async function postComment(
	data: IRequestComment,
	boardId: number,
): Promise<string | IApiResponse | undefined> {
	console.log(data);
	try {
		const response = await api.post(`/board/${boardId}/comment`, data);
		if (response.data.statusCode === 201) {
			return response.data;
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return 'comment가 정상적으로 생성되지 않았습니다.';
	}
}
