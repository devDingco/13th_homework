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
	general: string = '서버에서 오류가 발생했습니다. 다시 시도해주세요.',
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
