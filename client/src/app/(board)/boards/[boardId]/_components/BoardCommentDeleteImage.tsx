/** @format */

import Image from 'next/image';

export default function BoardCommentDeleteImage() {
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
