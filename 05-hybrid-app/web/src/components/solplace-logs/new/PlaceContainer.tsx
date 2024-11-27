"use client";

import InputField from "@/components/inputField";
import ImageUpload from "./ImageUpload";
import Input from "@/components/input";
import { useState } from "react";
import Image from "next/image";
import right_arrow from "../../../../public/images/icons/right_arrow.svg";

export default function PlaceContainer() {
  const [contentsLength, setContentsLength] = useState(0);
  const onChangeContents = (event) => {
    // console.log(event.target.value);
    const currentLength = event.target.value;
    setContentsLength(currentLength.length);
  };
  return (
    <div className="px-20 pt-24 flex w-full">
      <form className="flex flex-col gap-20 w-full">
        {/* 사진 등록 */}
        <ImageUpload />
        {/* 플레이스 이름 */}
        <InputField name="플레이스 이름" required>
          <Input placeholder="플레이스 이름을 입력해 주세요. (1자 이상)" />
        </InputField>

        {/* 플레이스 주소 */}
        <InputField name="플레이스 주소">
          <button className="w-full h-44 py-8 px-12 rounded-lg border border-black flex justify-between">
            <span>플레이스 주소 입력</span>
            <Image src={right_arrow} alt="오른쪽버튼" />
          </button>
        </InputField>

        {/* 플레이스 내용 */}
        <InputField name="플레이스 내용" required className="relative">
          <textarea
            className="resize-none py-12 px-16 w-full h-148 rounded-lg border border-[#d4d3d3] "
            placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
            onChange={onChangeContents}
          />
          <span className="w-full absolute right-16 bottom-12 text-right text-[#ababab] text-sm font-medium leading-tight">
            {contentsLength}/100
          </span>
        </InputField>

        {/* 로그 등록 버튼 */}
        <button className="w-full h-48 px-16 py-12 bg-[#2873e4] rounded-lg text-center text-white text-lg font-bold leading-normal">
          로그 등록
        </button>
      </form>
    </div>
  );
}
