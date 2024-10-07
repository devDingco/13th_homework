/** @format */
'use client';

import { EButtonKorea, EButtonTitle, IButtonProps } from '@/models/button.type';

import React from 'react';
import deleteBoard from '@/apis/boards/deleteBoard';
import useOnClickBack from '@/hooks/useOnClickBack';
import useSWR from 'swr';

const CommonButton = React.memo(({ title, isButtonDisabled, boardId }: IButtonProps) => {
	const { data, mutate } = useSWR('/board', null, {
		revalidateOnFocus: false,
	});

	const onClickBack = useOnClickBack();

	const onClickButtonCondition = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		switch (event.currentTarget.id) {
			case EButtonTitle.Back:
				onClickBack();
				break;
			case EButtonTitle.Delete:
				if (boardId) {
					const result = await deleteBoard(boardId, data);
					if (result) {
						await mutate();
						onClickBack();
					}
				}
				break;
			case EButtonTitle.Cancel:
				onClickBack();
				break;
			case EButtonTitle.Sumbit:
				// Submit logic goes here
				break;
			default:
				break;
		}
	};

	return (
		<button
			id={title}
			className={`prose-r_16_24 flex h-12 cursor-pointer items-center justify-center rounded-lg border-[1px] px-3 py-4 text-black ${
				(title === EButtonTitle.Cancel || title === EButtonTitle.Back) &&
				'border-black text-black'
			} ${
				(title === EButtonTitle.Sumbit || title === EButtonTitle.Update) &&
				(isButtonDisabled ? 'bg-gray-300 text-gray-100' : 'bg-[#2974E5] text-gray-100')
			} ${
				(title === EButtonTitle.Delete || title === EButtonTitle.Comment) &&
				'border-white bg-black text-white'
			}`}
			onClick={onClickButtonCondition}
			disabled={isButtonDisabled}
		>
			{EButtonKorea[title]}
		</button>
	);
});

CommonButton.displayName = 'CommonButton';

export default CommonButton;
