/** @format */

import CommonTextarea from '../../_components/CommonTextarea';
import { ETitle } from '@/models/board.type';
import React from 'react';
import { useState } from 'react';

const BoardCommentTextareaWrapper = React.memo(() => {
	const [length, setLength] = useState(0);

	return (
		<div className="relative">
			<CommonTextarea title={ETitle.Comment} setLength={setLength} />
			<div className="prose-me_16_24 absolute bottom-4 right-4 text-gray-400">
				{length} / 100
			</div>
		</div>
	);
});

BoardCommentTextareaWrapper.displayName = 'BoardCommentTextareaWrapper';

export default BoardCommentTextareaWrapper;
