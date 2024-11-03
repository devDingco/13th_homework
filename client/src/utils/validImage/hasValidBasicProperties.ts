/** @format */

import { ALLOWED_EXTENSIONS, ALLOWED_TYPES, MAX_SIZE } from './Image.const';

function getFileExtension(filename: string): string {
	return filename.split('.').pop()?.toLowerCase() || '';
}

export default function hasValidBasicProperties(image: File): boolean {
	const extension = getFileExtension(image.name);
	return (
		image.size > 0 &&
		image.size < MAX_SIZE &&
		ALLOWED_TYPES.includes(image.type) &&
		ALLOWED_EXTENSIONS.includes(extension)
	);
}
