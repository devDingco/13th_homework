/** @format */

const maxSize = 5 * 1024 * 1024;
export function filterFormImage(images: File[]) {
	return images.some(
		(image) =>
			image.size > 0 &&
			image.size < maxSize &&
			(image.type.includes('jpeg') || image.type.includes('png')),
	);
}
