/** @format */
'use server';
// [ ] 왜 formData에서 address를 못 들고 오는걸까..? 나중에 디버깅하기

import { ICreateFormBoard } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';
import { filterFormImage } from '@/utils/filterFormImage';
import { filterFormRequire } from '@/utils/filterFormRequire';
import postBoard from '../apis/boards/postBoard';

const required = '필수입력 사항입니다.';
const requiredFields = ['Author', 'Password', 'Title', 'Content'];
export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError> {
	const fieldValues = Object.fromEntries(
		requiredFields.map((key) => [key.toLowerCase(), formData.get(key) as string]),
	);

	const youtubeUrl = formData.get('YoutubeUrl') as string;
	const address = formData.get('Address') as string;
	const detailAddress = formData.get('DetailAddress') as string;
	const images = formData.getAll('image') as File[];

	const { errors, hasError } = filterFormRequire(fieldValues, requiredFields);

	if (hasError) {
		return {
			data: null,
			errors: {
				...errors,
				general: '',
			},
		};
	}

	if (!filterFormImage(images))
		return {
			data: null,
			errors: {
				author: '',
				password: '',
				title: '',
				content: '',
				general: '이미지가 형식에 맞지 않습니다.',
			},
		};

	// TODO 이미지 처리해야함

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
