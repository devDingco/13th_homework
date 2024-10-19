/** @format */

import { actionHandleError } from './actionHandlerError';

const required = '필수입력 사항입니다.';

export function filterFormRequire(fieldValues, requiredFields) {
	const errors = Object.fromEntries(
		requiredFields.map((key) => [key.toLowerCase(), fieldValues[key] ? '' : required]),
	);

	const hasError = Object.values(errors).some((error) => error);

	if (hasError) {
		return actionHandleError(errors, '');
	}
}
