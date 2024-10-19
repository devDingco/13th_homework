/** @format */
'use server';
// [ ] 왜 formData에서 address를 못 들고 오는걸까..? 나중에 디버깅하기

import { ICreateFormBoard, IFormLower } from '@/models/board.type';

import { IFormStateError } from '@/models/formBoardError';
import { filterFormImage } from '@/utils/filterFormImage';
import { filterFormRequire } from '@/utils/filterFormRequire';
import postBoard from '../apis/boards/postBoard';
import uploadImageS3 from '@/apis/boards/uploadImageS3';

const requiredFields = ['Author', 'Password', 'Title', 'Content'];

export async function createBoardAction(
	prevState: IFormStateError,
	formData: FormData,
): Promise<IFormStateError> {
	const fieldValues = Object.fromEntries(
		requiredFields.map((key) => [key.toLowerCase(), formData.get(key) as string]),
	) as unknown as IFormLower;

	const youtubeUrl = (formData.get('YoutubeUrl') as string) || '';
	const address = (formData.get('Address') as string) || '';
	const detailAddress = (formData.get('DetailAddress') as string) || '';
	let images = (formData.getAll('image') as File[]) || [];

	images = images.filter((image) => image.size !== 0);

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

	let imageUrl: string[] = [];
	if (images.length > 0) {
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

		imageUrl = await uploadImageS3(images);
	}

	const data: ICreateFormBoard = {
		...fieldValues,
		imageUrl,
		youtubeUrl,
		address,
		detailAddress,
	};

	const responseData = await postBoard(data);

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
