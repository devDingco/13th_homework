/** @format */

import { InputImage } from '@/components/ui/inputImage';

export default function NewImageContainer() {
	return (
		<div className="flex flex-col gap-2">
			<div className="prose-me_16_24">사진 첨부</div>
			<div className="mt-2 flex gap-4">
				{[...new Array(3)].map((_, index) => (
					<InputImage key={index} number={index} />
				))}
			</div>
		</div>
	);
}
