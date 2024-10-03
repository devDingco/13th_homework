/** @format */
'use client';

import { EBoardButton, EButtonKorea, IBoardButton } from '@/models/button.type';

import Image from 'next/image';
import useOnClickBack from '@/hooks/useOnClickBack';
import useOnClickPush from '@/hooks/useOnClickPush';
import { useParams } from 'next/navigation';

export default function BoardButton({ content }: IBoardButton) {
	const { boardId } = useParams();

	const onClickBack = useOnClickBack();
	const onClickPush = useOnClickPush();

	const onClickButtonCondition = () => {
		switch (content) {
			case EBoardButton.list:
				onClickBack();
				break;
			case EBoardButton.update:
				onClickPush(`/boards/${boardId}/edit?modal=true`);
				break;
		}
	};
	return (
		<div
			className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px] border-black px-3 py-2"
			onClick={onClickButtonCondition}
		>
			<Image src={`/Images/${content}.svg`} alt="icon" width={24} height={24} />
			<div className="prose-sb_14_20">{EButtonKorea[content]}</div>
		</div>
	);
}
