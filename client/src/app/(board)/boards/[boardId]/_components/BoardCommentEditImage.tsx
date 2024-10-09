/** @format */

import Image from 'next/image';

export default function BoardCommentEditImage() {
	return (
		<Image
			src="/Images/edit.svg"
			alt="edit"
			width={24}
			height={24}
			className="cursor-pointer"
		/>
	);
}
