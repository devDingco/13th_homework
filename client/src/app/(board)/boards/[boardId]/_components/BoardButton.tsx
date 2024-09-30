/** @format */

import { EBoardButtonContent, IBoardButton } from '@/models/button.type';

import Image from 'next/image';

export default function BoardButton({ content }: IBoardButton) {
	return (
		<div className="flex h-10 items-center justify-center gap-2 rounded-lg border-[1px] border-black px-3 py-2">
			<Image src={`/Images/${content}.svg`} alt="icon" width={24} height={24} />
			<div className="prose-sb_14_20">{EBoardButtonContent[content]}</div>
		</div>
	);
}
