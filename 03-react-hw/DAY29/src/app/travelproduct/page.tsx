"use client";

import Image from "next/image";
import { useState } from "react";

export default function TravelproductPage() {
  const [isAvailable, setisAvailable] = useState(true);

  const changePage = () => {
    setisAvailable((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-16 mt-10">
        {/* 맨 위 */}
        <div className="flex flex-col gap-6">
          <p className="text-black text-[28px] font-bold leading-9">
            2024 끝여름 낭만있게 마무리 하고 싶다면?
          </p>
          {/* 숙박권 리스트 */}
          <div className="flex gap-6 relative">
            <div className="relative">
              <Image
                src={`/images/products/a.png`}
                alt="productList"
                width={628}
                height={628}
                className="w-[628px] h-[628px] bg-gradient-to-b from-black to-black rounded-2xl"
              />
              {/* 숙박 판매 글 */}
              <div className="flex flex-col absolute bottom-0 p-6 w-full">
                <h3 className="text-white text-2xl font-bold leading-loose">
                  포항 : 당장 가고 싶은 숙소
                </h3>
                <p className="text-white text-xl font-medium leading-normal truncate">
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                  쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라
                  우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고
                  니러 우니로라얄리얄리 얄라셩 얄라리 얄라
                </p>
                <span className="text-white text-2xl font-bold leading-loose w-full text-end">
                  32,900원
                </span>
              </div>
            </div>
            <Image
              src={`/images/products/b.png`}
              alt="productList"
              width={628}
              height={628}
              className="w-[628px] h-[628px] bg-gradient-to-b from-black to-black rounded-2xl"
            />
            {/* 오른쪽 버튼 */}
            <button className="absolute -right-10 top-[280px] transform ">
              <Image
                src={`/images/icons/rightPage.svg`}
                alt="rightPage"
                width={80}
                height={80}
              />
            </button>
          </div>
        </div>

        {/* 중간 예약 사진 머시기 */}
        <div className="bg-sky-900 w-full h-60 rounded-2xl text-white font-bold text-4xl text-end px-16 pt-20">
          천만 관객이 사랑한
        </div>

        {/* 여기서에서만 예약할 수 있는 머시기 상자 */}
        <div className="flex flex-col gap-6">
          <p className="text-black text-[28px] font-bold leading-9">
            여기에서만 예약할 수 있는 숙소
          </p>
          {/* button */}
          <div className="flex gap-4">
            <button
              className={`w-[123px] h-10 rounded-lg ${
                isAvailable
                  ? "bg-black text-white text-base font-semibold"
                  : "text-neutral-600 text-base font-medium"
              }`}
              onClick={changePage}
            >
              예약 가능 숙소
            </button>
            <button
              className={`w-[123px] h-10 rounded-lg ${
                isAvailable
                  ? "text-neutral-600 text-base font-medium"
                  : "bg-black text-white text-base font-semibold"
              }`}
              onClick={changePage}
            >
              예약 마감 숙소
            </button>
          </div>
          {/* serachBar 가져오기 */}

          {/* 아이콘들과 그리드 리스트들 */}
          <div className="flex flex-col gap-8">
            {/* icons */}
            <div className="flex justify-between py-4">
              {/* 1인 전용 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/Single person accommodation.svg`}
                />
                <span>1인 전용</span>
              </div>
              {/* 아파트 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/apartment.svg`}
                />
                <span>아파트</span>
              </div>
              {/* 호텔 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/hotel.svg`}
                />
                <span>호텔</span>
              </div>
              {/* 캠핑 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/camp.svg`}
                />
                <span>캠핑</span>
              </div>
              {/* 룸 서비스 가능 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/room service.svg`}
                />
                <span>룸 서비스 가능</span>
              </div>
              {/* 불멍 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/fire.svg`}
                />
                <span>불멍</span>
              </div>
              {/* 반신욕&스파 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/_spa.png`}
                />
                <span>반신욕&스파</span>
              </div>
              {/* 바다 위 숙소 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/house on the sea.svg`}
                />
                <span>바다 위 숙소</span>
              </div>
              {/* 플랜테리어 */}
              <div className="flex flex-col gap-2 items-center w-[100px]">
                <Image
                  alt="icon"
                  width={40}
                  height={40}
                  src={`/images/icons/outline/planterior.svg`}
                />
                <span>플랜테리어</span>
              </div>
            </div>

            {/* grid */}
            <div>
              {/* 판매1게시글 */}
              <div>
                <Image
                  src={`/images/products/a.png`}
                  alt=""
                  width={296}
                  height={296}
                />
                <div className="w-[296px]">
                  <h1 className="text-[#333333] text-base font-medium leading-normal truncate">
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                    쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라우러라
                    우러라 새여 자고 니러 우러라 새여널라와 시름 한 나도 자고
                    니러 우니로라얄리얄리 얄라셩 얄라리 얄라
                  </h1>
                  <p className="truncate text-[#5f5f5f] text-sm font-normal leading-tight">
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                    쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라우러라
                    우러라 새여 자고 니러 우러라 새여널라와 시름 한 나도 자고
                    니러 우니로라얄리얄리 얄라셩 얄라리 얄라
                  </p>
                  <div className="text-[#2974e5] text-sm font-normal leading-tight">
                    #6인 이하 #건식 사우나 #애견동반 가능
                  </div>
                  <div className="pt-4 flex justify-between">
                    <div className="flex gap-1">
                      <Image
                        src={`/images/고양이1.jpg`}
                        alt="profile"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-[#5f5f5f] text-sm font-light leading-tight">
                        반야트리
                      </span>
                    </div>
                    <span className="text-[#1c1c1c] text-base font-semibold leading-normal">
                      32,000원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
