/** @format */
'use server';

import { ICreateFormBoard, IFormLower } from '@/models/board.type';

import { IFormStateError } from '@/models/formBoardError';
import { filterFormRequire } from '@/utils/filterFormRequire';
import { isValidImage } from '@/utils/validImage/isValidImage';
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
	let images = formData.getAll('image') as File[];

	filterFormRequire(fieldValues, requiredFields);

	images = images.filter((image) => image.size !== 0);

	let imageUrl: string[] = [];
	if (images.length > 0) {
		await isValidImage(images);

		imageUrl = await uploadImageS3(images);
	}

	const finalData: ICreateFormBoard = {
		...fieldValues,
		imageUrl,
		youtubeUrl,
		address,
		detailAddress,
	};

	return await postBoard(finalData);
}
