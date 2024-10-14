/** @format */
// TODO: hover시 mouseOver & mouseLeave custom hook
'use client';

import { IBoardItem } from '@/models/board.type';
import Image from 'next/image';
import Link from 'next/link';
import { boardsUrlEndPoint } from '@/apis/config';
import { changeDateToISO } from '@/utils/changeDateToISO';
import useOnClickPush from '@/hooks/useOnClickPush';
import { useState } from 'react';

export default function BoardItem({ board }: IBoardItem) {
	const onClickPush = useOnClickPush();
	// useState를 사용했지만 custom hook을 사용하지 않은 이유
	// -> useState 하나때문에 custom hook을 사용하는 건 자존심이 상함
	// custom hook을 사용하는 이유 중 하나는 hook의 재사용성이라고 생각함.
	// 추후 hover 관련 반복되는 로직이 생길 경우 그 때 custom hook을 사용할 예정

	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	const formattedDate: string = changeDateToISO(board.createdAt);
	const boardId: number = board.boardId;

	return (
		<Link href={`${boardsUrlEndPoint}/${boardId}`}>
			<div
				className="flex w-full cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#f2f2f2] px-6 py-4"
				onMouseEnter={() => setHoveredItem(boardId)}
				onMouseLeave={() => setHoveredItem(null)}
			>
				<div className="prose-l_14_20 flex w-16 items-center justify-center text-[#776c6c]">
					{boardId}
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
						hoveredItem === boardId ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={(event) =>
						onClickPush(`${boardsUrlEndPoint}/?boardId=${boardId}`, event)
					}
				/>
			</div>
		</Link>
	);
}
