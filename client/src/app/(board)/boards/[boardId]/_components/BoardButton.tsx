/** @format */

import { EBoardButtonContent, IBoardButton } from '@/models/boardButton';
import Image from 'next/image';

export default function BoardButton({ content }: IBoardButton) {
    return (
        <div className="border-[1px] h-10 px-3 py-2 flex gap-2 border-black rounded-lg justify-center items-center">
            <Image
                src={`/Images/${content}.svg`}
                alt="icon"
                width={24}
                height={24}
            />
            <div className="prose-sb_14_20">{EBoardButtonContent[content]}</div>
        </div>
    );
}
