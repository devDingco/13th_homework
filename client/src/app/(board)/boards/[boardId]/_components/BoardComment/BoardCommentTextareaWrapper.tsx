/** @format */
// [ ] props type error

import CommonTextarea from '../../../_components/CommonTextarea';
import { ETitle } from '@/models/board.type';
import { ICommentTextareProps } from '@/models/children.type';
import React from 'react';

const BoardCommentTextareaWrapper = ({ length, setLength, value = '' }: ICommentTextareProps) => {
	return (
		<div className="relative">
			<CommonTextarea title={ETitle.Comment} setLength={setLength} value={value} />
			<div className="prose-me_16_24 absolute bottom-4 right-4 text-gray-400">
				{length} / 100
			</div>
		</div>
	);
};

BoardCommentTextareaWrapper.displayName = 'BoardCommentTextareaWrapper';

export default BoardCommentTextareaWrapper;
