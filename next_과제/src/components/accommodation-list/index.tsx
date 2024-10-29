"use client";
import SearchBox from "@/components/search-box";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon-factory";
import Image from "next/image";
import AccommodationMenu from "./accommodation-menu";

export default function AccommodationList() {
  const router = useRouter();
  const handleSearch = (search: string) => {};

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-2xl">여기에서 예약할 수 있는 숙소</h3>
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

      <AccommodationMenu />

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
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <h5 className="font-bold text-md">
                  살어리 살어리랏다 청산에 살어리랏다~~~
                </h5>
                <p className="text-sm text-gray-700">
                  살어리 살어리랏다 청산에 살어리랏다~~~
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ul className="flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li key={i} className="text-blue-500 text-sm">
                      #태그{i}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <span className="flex gap-2">
                    <Image
                      src="/images/profile.png"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>유저이름</span>
                  </span>
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
