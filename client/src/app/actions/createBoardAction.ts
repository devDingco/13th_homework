/** @format */
'use server';
import { IFormStateError } from '@/models/formBoardError';
import postBoard from '../../apis/boards/postBoard';
import { ICreateFormBoard } from '@/models/formBoard';

export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError> {
	const required = '필수입력 사항입니다.';
	console.log(formData);

	const author = formData.get('Author');
	const password = formData.get('Password');
	const title = formData.get('Title');
	const content = formData.get('Content');
	// const address = formData.get('Address');
	// const detailAddress = formData.get('DetailAddress');
	const youtubeUrl = formData.get('YoutubeUrl');

	if (!author || !password || !title || !content)
		return {
			errors: {
				author: author ? undefined : required,
				password: password ? undefined : required,
				title: title ? undefined : required,
				content: content ? undefined : required,
			},
		};
	else {
		try {
			const data: ICreateFormBoard = {
				author: author as string,
				title: title as string,
				content: content as string,
				youtubeUrl: youtubeUrl as string | undefined,
			};

			const response = await postBoard(data);

			if (response.statusCode === 201) {
				return response.data;
			}
		} catch (error) {
			console.error(error);
		}
		return {
			errors: {
				author: author ? undefined : required,
				password: password ? undefined : required,
				title: title ? undefined : required,
				content: content ? undefined : required,
			},
		};
	}
}
