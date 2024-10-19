/** @format */

import { EError } from '@/models/error.type';
import { actionHandleError } from './actionHandlerError';

export function filterFormRequire(fieldValues, requiredFields) {
	const errors = Object.fromEntries(
		requiredFields.map((key) => [key.toLowerCase(), fieldValues[key] ? '' : EError.REQUIRED]),
	);

	const hasError = Object.values(errors).some((error) => error);

	if (hasError) {
		return actionHandleError(errors, '');
	}
}
