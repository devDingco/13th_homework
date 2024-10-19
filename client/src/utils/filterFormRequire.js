/** @format */

export function filterFormRequire(fieldValues, requiredFields) {
	const errors = requiredFields.reduce((acc, field) => {
		const fieldName = field.toLowerCase();
		acc[fieldName] = fieldValues[fieldName] ? '' : '필수 입력 값입니다.';
		return acc;
	}, {});

	const hasError = Object.values(errors).some((error) => error);

	return { errors, hasError };
}
