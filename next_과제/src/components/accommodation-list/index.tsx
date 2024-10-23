"use client";
import SearchBox from "@/components/searchBox";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Icon from "@/components/iconFactory";
import Image from "next/image";

export default function AccommodationList() {
  const router = useRouter();
  const handleSearch = (search: string) => {};
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-xl">여기에서 예약할 수 있는 숙소</h3>
      <div>
        <ul className="flex gap-4 items-center">
          <li>
            <Button size="large" color="default" variant="solid">
              예약 가능 숙소
            </Button>
          </li>
          <li>
            <Button
              className="invert"
              size="large"
              color="default"
              variant="solid"
            >
              예약 가능 숙소
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 justify-between flex-wrap">
        <SearchBox handleSearch={handleSearch} />
        <Button
          className="max-sm:fixedBtn"
          size="large"
          color="primary"
          variant="solid"
          icon={<Icon icon="rwite" className="w-6 h-6" />}
          onClick={() => router.push("/")}
        >
          숙박권 판매하기
        </Button>
      </div>

      <ul className="flex gap-12 justify-between py-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-3 items-center w-24">
            <Icon icon="singlePersonAccommodation" className="w-10 h-10" />
            <span>1인 전용</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden relative">
              <div className="absolute right-4 top-4 flex text-white bg-[rgba(0,0,0,0.6)] py-1 pl-1 pr-2 rounded-lg">
                <Icon icon="bookmark" className="w-6 h-6" />
                <span>
                  <div className="blind">북마크 횟수</div>24
                </span>
              </div>
              <Image
                className="object-cover"
                src="/images/beach.jpg"
                alt=""
                width={296}
                height={296}
                style={{ width: 296, height: 296 }}
              />
            </div>
            <div>
              <div>
                <h5 className="font-bold text-md">포항 : 당장가고싶은숙소</h5>
                <p className="font-semibold text-sm">
                  살어리 살어리랏다 청산에 살어리랏다~~~
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ul className="flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li key={i}>#태그{i}</li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <span>유저이름</span>
                  <strong>
                    <div className="blind">숙소가격</div>
                    32,900원
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
