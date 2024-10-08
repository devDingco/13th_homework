/** @format */
'use client';

import { IBoardItem } from '@/models/board.type';
import Image from 'next/image';
import { changeDateToISO } from '@/utils/changeDateToISO';
import useOnClickPush from '@/hooks/useOnClickPush';
import { useState } from 'react';

export default function BoardItem({ board }: IBoardItem) {
	const onClickPush = useOnClickPush();
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	const onClickRouterDetail = (boardId: number) => {
		onClickPush(`/boards/${boardId}`);
	};

	const onClickDeleteButton = (event: React.MouseEvent) => {
		event.stopPropagation();
		onClickPush(`boards/?boardId=${board.boardId}`);
	};

	const formattedDate = changeDateToISO(board.createdAt);

	return (
		<div
			className="flex w-full cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#f2f2f2] px-6 py-4"
			onMouseEnter={() => setHoveredItem(board.boardId)}
			onMouseLeave={() => setHoveredItem(null)}
			onClick={() => onClickRouterDetail(board.boardId)}
		>
			<div className="prose-l_14_20 flex w-16 items-center justify-center text-[#776c6c]">
				{board.boardId}
			</div>
			<div className="prose-me_14_20 w-full">{board.title}</div>
			<div className="prose-l_14_20 flex w-[100px] items-center justify-center text-[#333333]">
				{board.author}
			</div>
			<div className="prose-l_14_20 flex w-[100px] items-center justify-center text-[#919191]">
				{formattedDate}
			</div>

			<Image
				src="/Images/delete.svg"
				alt="delete"
				width={20}
				height={20}
				className={`cursor-pointer transition-opacity duration-300 ${
					hoveredItem === board.boardId ? 'opacity-100' : 'opacity-0'
				}`}
				onClick={(event) => onClickDeleteButton(event)}
			/>
		</div>
	);
}