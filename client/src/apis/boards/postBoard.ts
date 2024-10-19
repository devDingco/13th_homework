/** @format */

import { actionHandleError, defaultErrors } from '@/utils/actionHandlerError';
import { api, boardUrlEndPoint } from '../../../config/axiosConfig';

import { ICreateFormBoard } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';

export default async function postBoard(data: ICreateFormBoard): Promise<IFormStateError> {
	try {
		const response = await api.post(boardUrlEndPoint, data);

		if (response.data.statusCode === 201) {
			return {
				data: response.data.data,
				errors: defaultErrors,
			};
		}
		return actionHandleError({}, '정상적으로 데이터가 저장되지 않았습니다.');
	} catch (error) {
		console.error(error);
		return actionHandleError({});
	}
}
