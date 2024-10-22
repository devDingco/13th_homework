/** @format */

import { EError } from '@/models/error.type';

export function filterFormRequire(fieldValues, requiredFields) {
	const errors = Object.fromEntries(
		requiredFields.map((key) => [
			key.toLowerCase(),
			fieldValues[key.toLowerCase()] ? '' : EError.REQUIRED,
		]),
	);

	const hasError = Object.values(errors).some((error) => error);

	return { errors, hasError };
}
