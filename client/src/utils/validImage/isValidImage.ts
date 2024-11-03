/** @format */

import hasValidBasicProperties from './hasValidBasicProperties';

export function isValidImage(images: File[]): boolean {
	return !images.every(hasValidBasicProperties);
}
