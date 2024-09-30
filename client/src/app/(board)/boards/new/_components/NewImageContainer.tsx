/** @format */

import NewImage from './NewImage';

export default function NewImageContainer() {
	return (
		<div className="flex flex-col gap-2">
			<div className="prose-me_16_24">사진 첨부</div>
			<div className="flex gap-4">
				<NewImage />
				<NewImage />
				<NewImage />
			</div>
		</div>
	);
}
