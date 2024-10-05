/** @format */
'use client';

import BoardCommentStar from './BoardCommentStar';
import BoardCommentTextareaWrapper from './BoardCommentTextareaWrapper';
import CommonButton from '../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { ETitle } from '@/models/board.type';
import NewInputContainer from '../../new/_components/NewInputContainer';
import createBoardCommentAction from '@/actions/createBoardCommentAction';
import { useFormState } from 'react-dom';

export default function BoardCommentForm() {
	const [state, formAction] = useFormState(createBoardCommentAction, {
		error: {
			author: undefined,
			Password: undefined,
		},
	});

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<BoardCommentStar />
			<div className="flex w-1/2 gap-4">
				<NewInputContainer title={ETitle.Author} />
				<NewInputContainer title={ETitle.Password} />
			</div>
			<BoardCommentTextareaWrapper />
			<div className="flex justify-end">
				<CommonButton title={EButtonTitle.Comment} />
			</div>
		</form>
	);
}
