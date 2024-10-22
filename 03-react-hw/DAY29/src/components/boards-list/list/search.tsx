// search.tsx
import Input from "@/components/input";
import Image from "next/image";
import UserDatePicker from "./datePicker";
import Link from "next/link";
import type { ChangeEvent } from "react";

interface ISearchProps {
  onChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (dates: any) => void; // 날짜 변경 props 추가
}

export default function Search({ onChangeSearch, onDateChange }: ISearchProps) {
  return (
    <div className="h-12 flex gap-2 w-full ">
      <div className="flex gap-4 w-[1110px] justify-start">
        <UserDatePicker onDateChange={onDateChange} />
        <div className="relative flex w-full min-w-[180px] max-w-[640px]">
          <Input
            name="search"
            type="text"
            placeholder="제목을 검색해주세요"
            className="bg-[#f2f2f2] rounded-lg border-none pl-11"
            onChange={onChangeSearch}
          />
          <Image
            src={"/images/icons/search.svg"}
            alt="검색"
            width={24}
            height={24}
            className="absolute top-3 left-3"
          />
        </div>
      </div>
      <Link
        href={"/boards/new"}
        className="h-12 py-3 px-4 bg-[#2974E5] rounded-lg text-white text-lg leading-normal w-[162px] flex gap-2"
      >
        <Image
          src="/images/icons/write.svg"
          alt="작성하기"
          width={24}
          height={24}
        />
        드립토크 등록
      </Link>
    </div>
  );
}
