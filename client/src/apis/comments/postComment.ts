/** @format */

import { IRequestComment } from '@/models/comment.type';
import { api } from '../config';

export default async function postComment(data: IRequestComment, boardId: number) {
	try {
		const response = await api.post(`/board/${12}/comment`, data);
		if (response && response.data && response.data.statusCode === 201) {
			return response.data.data;
		} else {
			console.log('Failed to post comment:', response.data || response);
			return null;
		}
	} catch (error: any) {
		if (error.response && error.response.data && error.response.data.validationErrors) {
			console.log(error.response.data.validationErrors);
		} else {
			console.log('An error occurred:', error.message || error);
		}
		return null;
	}
}
