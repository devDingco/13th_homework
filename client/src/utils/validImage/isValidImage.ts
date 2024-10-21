/** @format */
import { EError } from '@/models/error.type';
import { actionHandleError } from '../actionHandlerError';
import checkImageResolution from './checkImageResolution';
import hasValidBasicProperties from './hasValidBasicProperties';

export async function isValidImage(images: File[]): Promise<void> {
	if (!images.every(hasValidBasicProperties)) {
		actionHandleError({}, EError.SIZE_TYPE);
	}

	const resolutionChecks = await Promise.all(images.map(checkImageResolution));
	if (resolutionChecks.includes(false)) {
		actionHandleError({}, EError.RESOLUTION);
	}
}
