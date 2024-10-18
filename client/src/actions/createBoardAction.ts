/** @format */
'use server';

import { ICreateFormBoard } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';
import postBoard from '../apis/boards/postBoard';

const required = '필수입력 사항입니다.';
const maxSize = 5 * 1024 * 1024;

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

	let images = formData.getAll('image') as File[];
	images = images.filter(
		(image) =>
			image.size > 0 &&
			image.size < maxSize &&
			image.type.includes('jpeg') &&
			image.type.includes('png'),
	);
	console.log(images);
	// if (!author || !password || !title || !content)
	// 	return {
	// 		data: null,
	// 		errors: {
	// 			author: author ? undefined : required,
	// 			password: password ? undefined : required,
	// 			title: title ? undefined : required,
	// 			content: content ? undefined : required,
	// 		},
	// 	};

	// const data: ICreateFormBoard = {
	// 	author,
	// 	title,
	// 	password,
	// 	content,
	// 	youtubeUrl,
	// 	address,
	// 	detailAddress,
	// };

	// const responseData = await postBoard(data);

	// return {
	// 	data,
	// 	// data: responseData,
	// 	errors: {
	// 		author: undefined,
	// 		password: undefined,
	// 		title: undefined,
	// 		content: undefined,
	// 	},
	// };
	return 1;
}
