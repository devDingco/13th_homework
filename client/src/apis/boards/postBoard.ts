/** @format */

import { actionHandleError, defaultErrors } from '@/utils/actionHandlerError';
import { api, boardUrlEndPoint } from '../../../config/axiosConfig';

import { EError } from '@/models/error.type';
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
		return actionHandleError({}, EError.DB_ERROR);
	} catch (error) {
		console.error(error);
		return actionHandleError({});
	}
}
