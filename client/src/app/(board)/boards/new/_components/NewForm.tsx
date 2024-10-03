/** @format */
'use client';

import { ETitle, IBoardEditProps } from '@/models/board.type';

import CommonButton from '../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import NewAddressInputContainer from './NewAddressInputContainer';
import NewImageContainer from './NewImageContainer';
import NewInputContainer from './NewInputContainer';
import NewTextarea from './NewTextarea';
import { createBoardAction } from '@/actions/createBoardAction';
import { useFormState } from 'react-dom';
import useOnClickPush from '@/hooks/useOnClickPush';

export default function NewForm({ boardInfor }: IBoardEditProps) {
	const onClickPush = useOnClickPush();

	const [state, formAction] = useFormState(createBoardAction, {
		data: null,
		errors: {
			author: undefined,
			password: undefined,
			title: undefined,
			content: undefined,
		},
	});

	if (state.data) {
		onClickPush(`/boards/${state.data.boardId}`);
	}

	return (
		<form className="flex flex-col gap-10" action={formAction}>
			<div className="flex gap-10 border-b-[1px] border-gray-200 pb-10">
				<NewInputContainer
					title={ETitle.Author}
					error={state.errors?.author}
					edit={boardInfor?.author}
				/>
				<NewInputContainer
					title={ETitle.Password}
					error={state.errors?.password}
					edit={boardInfor?.password}
				/>
			</div>
			<NewInputContainer
				title={ETitle.Title}
				error={state.errors?.title}
				edit={boardInfor?.title}
			/>
			<NewTextarea
				title={ETitle.Content}
				error={state.errors?.content}
				edit={boardInfor?.content}
			/>
			<NewAddressInputContainer
				title={ETitle.Address}
				edit={{
					address: boardInfor?.address as string,
					detailAddress: boardInfor?.detailAddress as string,
				}}
			/>
			<NewInputContainer title={ETitle.YoutubeUrl} edit={boardInfor?.youtubeUrl} />
			<NewImageContainer />
			<div className="flex w-full items-center justify-end gap-4">
				<CommonButton title={EButtonTitle.cancel} />
				<CommonButton title={EButtonTitle.sumbit} />
			</div>
		</form>
	);
}
