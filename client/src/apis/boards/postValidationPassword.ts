/** @format */

import { api } from '../config';

export default async function postValidationPassword(boardId: string, password: string) {
	const response = await api.post(`/board/${boardId}/password`, { password });
}
