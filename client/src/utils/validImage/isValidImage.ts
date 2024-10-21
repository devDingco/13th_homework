/** @format */
import { EError } from '@/models/error.type';
import { actionHandleError } from '../actionHandlerError';
import hasValidBasicProperties from './hasValidBasicProperties';

export async function isValidImage(images: File[]): Promise<void> {
	if (!images.every(hasValidBasicProperties)) {
		actionHandleError({}, EError.SIZE_TYPE);
	}
}
