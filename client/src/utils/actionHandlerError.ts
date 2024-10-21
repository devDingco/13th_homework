/** @format */

import { IFormStateError } from '@/models/formBoardError';

export const defaultErrors: IFormStateError['errors'] = {
	author: '',
	password: '',
	title: '',
	content: '',
	general: '',
};

export function actionHandleError(
	errors: Partial<IFormStateError['errors']>,
	general: string,
): IFormStateError {
	return {
		data: null,
		errors: {
			...defaultErrors,
			...errors,
			general,
		},
	};
}
