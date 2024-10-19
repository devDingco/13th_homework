/** @format */
'use server';

import { ICreateFormBoard, IFormLower } from '@/models/board.type';

import { IFormStateError } from '@/models/formBoardError';
import { actionHandleError } from '@/utils/actionHandlerError';
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

	const { errors, hasError } = filterFormRequire(fieldValues, requiredFields);

	if (hasError) {
		return actionHandleError(errors);
	}
	images = images.filter((image) => image.size !== 0);

	let imageUrl: string[] = [];
	if (images.length > 0) {
		if (!filterFormImage(images)) actionHandleError({}, '이미지 형식에 맞지 않습니다.');

		imageUrl = await uploadImageS3(images);
	}

	const finalData: ICreateFormBoard = {
		...fieldValues,
		imageUrl,
		youtubeUrl,
		address,
		detailAddress,
	};

	// return await postBoard(finalData);
}
