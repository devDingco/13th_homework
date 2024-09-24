/** @format */

import { ETitle, ITitle } from '@/models/newTitle';
import NewInput from './NewInput';

export default function NewAddressInputContainer({ title }: ITitle) {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <div className="prose-me_16_24 text-gray-800">주소</div>
            <div className="flex gap-2">
                <div className="border-[1px] border-gray-200 rounded-lg outline-none flex justify-center items-center px-3 text-gray-400">
                    01234
                </div>
                <button className="bg-white border-[1px] border-black px-3 py-4 rounded-lg prose-sb_18_24">
                    우편번호 검색
                </button>
            </div>
            <NewInput title={title} />
            <NewInput title={ETitle.DetailAddress} />
        </div>
    );
}
