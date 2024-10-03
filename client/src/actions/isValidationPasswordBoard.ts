/** @format */
'use server';

const errorMessage = '비밀번호가 일치하지 않습니다.';

export default async function isValidationPasswordBoard(prevState, formData) {
	const password = formData.get('password');
	console.log(password);
}
