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
			case EButtonTitle.Back:
				onClickBack();
				break;
			case EButtonTitle.Delete:
				const result = await deleteBoard(boardId as number, data);
				if (result) {
					await mutate();
					onClickBack();
				}
				break;
			case EButtonTitle.Cancel:
				onClickBack();
				break;
			case EButtonTitle.Sumbit:
				break;
		}
	};
	return (
		<button
			id={title}
			className={`prose-r_16_24 flex h-12 cursor-pointer items-center justify-center rounded-lg border-[1px] px-3 py-4 text-black ${
				(title === EButtonTitle.Cancel || title === EButtonTitle.Back) &&
				'border-black text-black'
			} ${(title === EButtonTitle.Sumbit || title === EButtonTitle.Update) && (isButtonDisabled ? 'bg-gray-300 text-gray-100' : 'bg-[#2974E5] text-gray-100')} ${(title === EButtonTitle.Delete || title === EButtonTitle.Comment) && 'border-white bg-black text-white'}`}
			onClick={onClickButtonCondition}
		>
			{EButtonKorea[title]}
		</button>
	);
}
