/** @format */
'use server';

import postValidationPassword from '@/apis/boards/postValidationPassword';

// const errorMessage = '비밀번호가 일치하지 않습니다.';

export default async function isValidationPasswordBoard(prevState, formData) {
	const password = formData.get('password');
	try {
		const result = await postValidationPassword(prevState.boardId, password);
		if (result) {
			return {
				boardId: prevState.boardId,
				error: null,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			boardId: prevState.boardId,
			error: error,
		};
	}
}
