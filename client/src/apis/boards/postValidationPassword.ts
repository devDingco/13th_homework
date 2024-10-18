/** @format */

import { api, boardUrlEndPoint } from '../../../config/axios_config';

export default async function postValidationPassword(
	boardId: string,
	password: string,
): Promise<boolean | undefined> {
	try {
		const response = await api.post(`${boardUrlEndPoint}/${boardId}/password`, { password });
		if (response.data) return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
