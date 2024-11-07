import Input from "@/components/input";
import Image from "next/image";

export default function Mypage() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col py-10 w-[1280px] gap-10 px-8">
        <div className="text-black text-[28px] font-bold leading-9">
          마이 페이지
        </div>

        {/* 내 정보 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-black text-lg  leading-normal">내 정보</span>
            <div className="flex gap-1 items-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <span>영케이</span>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <Image src="/images/point.svg" alt="d" width={24} height={24} />
            <span className="text-black text-xl font-medium leading-normal">
              23,000 P
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 px-3 py-2 bg-[#f2f2f2] rounded-lg flex justify-between">
              <div>거래내역&북마크</div>
              <Image
                src="/images/right_arrow.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>

            <div className="h-10 px-3 py-2 bg-[#f2f2f2] rounded-lg flex justify-between">
              <div>포인트 사용 내역</div>
              <Image
                src="/images/right_arrow.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>

            <div className="h-10 px-3 py-2 bg-[#f2f2f2] rounded-lg flex justify-between">
              <div>비밀번호 변경</div>
              <Image
                src="/images/right_arrow.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* 포인트 */}
          <div className="flex gap-4">
            <button className="h-10 px-4 py-2 bg-black rounded-lg text-white">
              나의 상품
            </button>
            <button>북마크</button>
          </div>

          {/* search, button */}
          <div className="flex gap-4 justify-end">
            <div className="relative flex w-full min-w-[180px] max-w-[640px]">
              <Input
                name="search"
                type="text"
                placeholder="제목을 검색해주세요"
                className="bg-[#f2f2f2] rounded-lg border-none pl-11"
                // onChange={onChangeSearch}
              />
              <Image
                src={"/images/icons/search.svg"}
                alt="검색"
                width={24}
                height={24}
                className="absolute top-3 left-3"
              />
            </div>
            <button className="h-12 px-4 py-3 bg-black rounded-lg text-white">
              검색
            </button>
          </div>

          {/* 나의상품, 북마크 리스트 */}
        </div>
      </div>
    </div>
  );
}
