/** @format */
'use client';

import { EButtonKorea, EButtonTitle, IButtonProps } from '@/models/button.type';

import deleteBoard from '@/apis/boards/deleteBoard';
import useOnClickBack from '@/hooks/useOnClickBack';
import useSWR from 'swr';

export default function CommonButton({ title, isButtonDisabled, boardId }: IButtonProps) {
	const { data, mutate } = useSWR('/board', null);

	const onClickBack = useOnClickBack();
	const onClickButtonCondition = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		switch (event.currentTarget.id) {
			case EButtonTitle.back:
				onClickBack();
				break;
			case EButtonTitle.delete:
				const result = await deleteBoard(boardId as number, data);
				if (result) {
					await mutate();
					onClickBack();
				}
				break;
			case EButtonTitle.cancel:
				onClickBack();
				break;
			case EButtonTitle.sumbit:
				break;
		}
	};
	return (
		<button
			id={title}
			className={`prose-sb_18_24 flex h-12 cursor-pointer items-center justify-center rounded-lg border-[1px] px-3 py-4 text-black ${
				(title === EButtonTitle.cancel || title === EButtonTitle.back) &&
				'border-black text-black'
			} ${(title === EButtonTitle.sumbit || title === EButtonTitle.update) && (isButtonDisabled ? 'bg-gray-300 text-gray-100' : 'bg-[#2974E5] text-gray-100')} ${title === EButtonTitle.delete && 'border-white bg-black text-white'}`}
			onClick={onClickButtonCondition}
		>
			{EButtonKorea[title]}
		</button>
	);
}
