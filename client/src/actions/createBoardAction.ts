/** @format */
'use server';

import { ICreateFormBoard } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';
import postBoard from '../apis/boards/postBoard';

const required = '필수입력 사항입니다.';

export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError> {
	// 왜 formData에서 address를 못 들고 오는걸까..? 나중에 디버깅하기
	const author = formData.get('Author') as string;
	const password = formData.get('Password') as string;
	const title = formData.get('Title') as string;
	const content = formData.get('Content') as string;
	const youtubeUrl = formData.get('YoutubeUrl') as string;
	const address = formData.get('Address') as string;
	const detailAddress = formData.get('DetailAddress') as string;

	if (!author || !password || !title || !content)
		return {
			data: null,
			errors: {
				author: author ? undefined : required,
				password: password ? undefined : required,
				title: title ? undefined : required,
				content: content ? undefined : required,
			},
		};
	else {
		const data: ICreateFormBoard = {
			author,
			title,
			password,
			content,
			youtubeUrl,
			address,
			detailAddress,
		};

		const responseData = await postBoard(data);

		return {
			data: responseData,
			errors: {
				author: undefined,
				password: undefined,
				title: undefined,
				content: undefined,
			},
		};
	}
}
