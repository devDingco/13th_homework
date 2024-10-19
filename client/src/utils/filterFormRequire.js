/** @format */
const required = '필수입력 사항입니다.';

export function filterFormRequire(fieldValues, requiredFields) {
	const errors = requiredFields.reduce((acc, field) => {
		const fieldName = field.toLowerCase();
		acc[fieldName] = fieldValues[fieldName] ? '' : required;
		return acc;
	}, {});

	const hasError = Object.values(errors).some((error) => error);

	return { errors, hasError };
}
