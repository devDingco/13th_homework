/** @format */

import Image from 'next/image';

export default function NewImage() {
    return (
        <div className="size-40 rounded-lg bg-gray-50 flex flex-col gap-2 cursor-pointer justify-center items-center">
            <Image src="/Images/add.svg" alt="plus" width={40} height={40} />
            <div className="prose-r_16_24 text-gray-600">
                클릭해서 사진 업로드
            </div>
        </div>
    );
}
