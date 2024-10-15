/** @format */

import { IDeleteProps } from '@/models/children.type';
import Image from 'next/image';

export default function BoardCommentDeleteImage({ id }: IDeleteProps) {
	return (
		<Image
			src="/Images/close.svg"
			alt="close"
			width={24}
			height={24}
			className="cursor-pointer"
		/>
	);
}
