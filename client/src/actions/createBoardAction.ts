/** @format */
'use server';
import { IFormStateError } from '@/models/formBoardError';
import postBoard from '../apis/boards/postBoard';
import { ICreateFormBoard } from '@/models/formBoard';

export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError | void> {
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
		try {
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
		} catch (error) {
			console.error(error);
		}
	}
}
