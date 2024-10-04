/** @format */
'use server';

import { IValidPasswordState } from '@/models/validationPasssword.type';
import postValidationPassword from '@/apis/boards/postValidationPassword';

const error = '비밀번호가 일치하지 않습니다.';
const inputError = '비밀번호가 입력되지 않았습니다.';
const serverError = '서버 요청 중 오류가 발생했습니다.';

export default async function isValidationPasswordBoard(
	prevState: IValidPasswordState,
	formData: FormData,
): Promise<IValidPasswordState> {
	const password = formData.get('password');

	if (!password) {
		return {
			boardId: prevState.boardId,
			error: inputError,
			validation: false,
		};
	}

	try {
		const result = await postValidationPassword(prevState.boardId, password as string);
		if (result) {
			return {
				boardId: prevState.boardId,
				error: null,
				validation: true,
			};
		} else {
			return {
				boardId: prevState.boardId,
				error,
				validation: false,
			};
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return {
			boardId: prevState.boardId,
			error: serverError,
			validation: false,
		};
	}
}
