/** @format */

import CommonTextarea from '../../_components/CommonTextarea';
import { ETitle } from '@/models/board.type';
import { useState } from 'react';

export default function BoardCommentTextareaWrapper() {
	const [length, setLength] = useState(0);

	return (
		<div className="relative">
			<CommonTextarea title={ETitle.Comment} setLength={setLength} />
			<div className="prose-me_16_24 absolute bottom-4 right-4 text-gray-400">
				{length} / 100
			</div>
		</div>
	);
}
