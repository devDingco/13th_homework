/** @format */

import Image from 'next/image';

export default function NewImage() {
	return (
		<div className="flex size-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-gray-50">
			<Image src="/Images/add.svg" alt="plus" width={40} height={40} />
			<div className="prose-r_16_24 text-gray-600">클릭해서 사진 업로드</div>
		</div>
	);
}
