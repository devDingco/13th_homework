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
	const author = formData.get('Author');
	const password = formData.get('Password');
	const title = formData.get('Title');
	const content = formData.get('Content');
	const youtubeUrl = formData.get('YoutubeUrl');
	const address = formData.get('Address');
	const detailAddress = formData.get('DetailAddress');

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
			password: password as string,
			content: content as string,
			youtubeUrl: youtubeUrl as string | undefined,
			address: address as string,
			detailAddress: detailAddress as string,
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
