/** @format */
'use client';

import BoardCommentStar from './BoardCommentStar';
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
		<form action={formAction}>
			<BoardCommentStar />
		</form>
	);
}
