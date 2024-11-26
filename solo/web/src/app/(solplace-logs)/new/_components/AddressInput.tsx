"use client"

import Image from "next/image"

export default function AddressInput() {
    return <div className="border-[1px] border-black flex items-center justify-between rounded-lg px-3 py-2">
        <div className=" prose-sb_14_20">플레이스 주소 입력</div>
        <Image src={"/Images/right_arrow.png"} alt="arrow_right" width={24} height={24} className="cursor-pointer size-6" />
    </div>
};
