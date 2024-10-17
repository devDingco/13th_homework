/** @format */

import { boardUrlEndPoint, commentUrlEndPoint } from '@/apis/config';
import { useEffect, useRef, useState } from 'react';

import { IBoardComment } from '@/models/comment.type';
import createBoardCommentAction from '@/actions/createBoardCommentAction';
import { useCommentPageStore } from '@/stores/useCommentPage';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export function useBoardCommentForm(comment?: IBoardComment, parentId?: string) {
	const { page } = useCommentPageStore();
	const param = useParams();

	const [rating, setRating] = useState<number>(comment ? (comment.rating as number) : 0);

	const [length, setLength] = useState<number>(comment ? comment.content.length : 0);

	const [state, formAction] = useFormState(createBoardCommentAction, {
		result: '',
		boardId: param.boardId,
		parentId: parentId || null,
		error: undefined,
	});

	const { data, mutate } = useSWR(
		`${boardUrlEndPoint}/${param.boardId}${commentUrlEndPoint}?page=${page}`,
		null,
		{
			revalidateOnFocus: false,
		},
	);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!state?.result) return;
		formRef.current?.reset();
		setRating(0);
		setLength(0);
		mutate([...data, state.result], false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return {
		length,
		setLength,
		rating,
		setRating,
		state,
		formAction,
		formRef,
	};
}
