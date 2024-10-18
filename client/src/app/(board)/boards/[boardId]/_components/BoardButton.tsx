/** @format */
'use client';

import { EBoardButton, EButtonKorea, IBoardButton } from '@/models/button.type';
import { boardsUrlEndPoint, editUrlEndPoint } from '~/config/axios_config';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BoardButton({ content }: IBoardButton) {
	const { boardId } = useParams();

	return (
		<Link
			href={`${boardsUrlEndPoint}${content === EBoardButton.update ? `/${boardId}${editUrlEndPoint}?modal=true` : ''}`}
		>
			<div className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px] border-black px-3 py-2">
				<Image src={`/Images/${content}.svg`} alt={content} width={24} height={24} />
				<div className="prose-sb_14_20">{EButtonKorea[content]}</div>
			</div>
		</Link>
	);
}
