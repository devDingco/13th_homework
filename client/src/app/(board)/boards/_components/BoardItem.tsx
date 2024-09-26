/** @format */
'use client';

import { IBoardItem } from '@/models/boardType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { changeDateToISO } from '@/utils/changeDateToISO';
// import deleteBoard from '@/app/apis/boards/deleteBoard';

export default function BoardItem({ board }: IBoardItem) {
	const router = useRouter();
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	const onClickRouterDetail = (boardId: number) => {
		router.push(`/boards/${boardId}`);
	};

	const onClickDeleteButton = (event: React.MouseEvent) => {
		event.stopPropagation();

		// deleteBoard(board.boardId);
	};

	const formattedDate = changeDateToISO(board.createdAt);

	return (
		<div
			className="w-full flex px-6 py-4 gap-2 border-[1px] border-[#f2f2f2] rounded-lg items-center cursor-pointer"
			onMouseEnter={() => setHoveredItem(board.boardId)}
			onMouseLeave={() => setHoveredItem(null)}
			onClick={() => onClickRouterDetail(board.boardId)}
		>
			<div className="w-16 flex justify-center items-center text-[#776c6c] prose-l_14_20">
				{board.boardId}
			</div>
			<div className="w-full prose-me_14_20">{board.title}</div>
			<div className="w-[100px] flex justify-center items-center text-[#333333] prose-l_14_20">
				{board.author}
			</div>
			<div className="w-[100px] flex justify-center items-center text-[#919191] prose-l_14_20">
				{formattedDate}
			</div>
			{hoveredItem === board.boardId && (
				<Image
					src="/Images/delete.svg"
					alt="delete"
					width={20}
					height={20}
					onClick={(event) => onClickDeleteButton(event)}
				/>
			)}
		</div>
	);
}
