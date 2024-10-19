/** @format */

import { MIN_RESOLUTION } from './Image.const';

export default async function checkImageResolution(image: File): Promise<boolean> {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = URL.createObjectURL(image);
		img.onload = () => {
			const isValidResolution =
				img.width >= MIN_RESOLUTION.width && img.height >= MIN_RESOLUTION.height;
			URL.revokeObjectURL(img.src);
			resolve(isValidResolution);
		};
		img.onerror = () => {
			URL.revokeObjectURL(img.src);
			resolve(false);
		};
	});
}
