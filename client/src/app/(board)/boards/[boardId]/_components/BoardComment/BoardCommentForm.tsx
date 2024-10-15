/** @format */
'use client';

import BoardCommentStar from './BoardCommentStar';
import BoardCommentTextareaWrapper from './BoardCommentTextareaWrapper';
import CommonButton from '../../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { ETitle } from '@/models/board.type';
import NewInputContainer from '../../../new/_components/NewInputContainer';
import { useBoardCommentForm } from '@/hooks/useBoardCommentForm';

export default function BoardCommentForm() {
	const { state, formAction, formRef, rating, setRating } = useBoardCommentForm();

	return (
		<form action={formAction} className="flex flex-col gap-4" ref={formRef}>
			<BoardCommentStar rating={rating} setRating={setRating} />
			<div className="flex items-center gap-8">
				<div className="flex w-1/2 gap-4">
					<NewInputContainer title={ETitle.Author} />
					<NewInputContainer title={ETitle.Password} />
				</div>
				<div className="prose-me_16_24 text-red-500">{state?.error}</div>
			</div>
			<BoardCommentTextareaWrapper />
			<div className="flex justify-end">
				<CommonButton title={EButtonTitle.Comment} />
			</div>
		</form>
	);
}
