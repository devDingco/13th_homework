/** @format */
import { IBoardProps } from '@/models/boardType';
import Image from 'next/image';

export default function BoardHeader({ infor }: IBoardProps) {
    return (
        <div className="flex flex-col gap-4 border-b-[1px] border-b-gray-100 pb-4">
            <div className="prose-b_28_36">{infor?.title}</div>
            <div className="prose-l_14_20 flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <Image
                        src="/Images/profile.svg"
                        alt="profile"
                        width={24}
                        height={24}
                    />
                    <div className="text-gray-700">{infor?.author}</div>
                </div>
                <div className="text-[#818181]">{infor?.createdAt}</div>
            </div>
        </div>
    );
}
