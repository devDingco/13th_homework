/** @format */
'use server';

import { ICreateFormBoard } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';
import postBoard from '../apis/boards/postBoard';

export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError> {
	const required = '필수입력 사항입니다.';

	const author = formData.get('Author');
	const password = formData.get('Password');
	const title = formData.get('Title');
	const content = formData.get('Content');
	const youtubeUrl = formData.get('YoutubeUrl');

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
			author: author as string,
			title: title as string,
			content: content as string,
			youtubeUrl: youtubeUrl as string | undefined,
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
