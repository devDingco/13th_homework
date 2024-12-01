"use client";

import { FETCH_SOLPLACE_LOGS } from "@/common/apis/graphql/queries/fetch-solplace-logs.query";
import LocationIcon from "@/icons/LocationIcon";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function GridList() {
  const { data } = useQuery(FETCH_SOLPLACE_LOGS);

  return (
    <div className="w-screen h-full px-20 pt-24 pb-96">
      <div className="grid grid-cols-2 gap-x-16 gap-y-20">
        {data?.fetchSolplaceLogs ? (
          data?.fetchSolplaceLogs.map((el) => (
            <Link
              href={`/solplace-logs/${el.id}`}
              key={`${el}-${el.id}`}
              className="w-full flex flex-col gap-8 hover:cursor-pointer hover:shadow-xl hover:rounded-lg"
            >
              <Image
                src={el.images[0]}
                alt="게시글목록"
                width={152}
                height={200}
                className="w-full h-full rounded-lg"
              />
              <div className="flex flex-col">
                {/* 제목 */}
                <span className="truncate text-[#1c1c1c] text-base font-bold leading-normal">
                  {el.title}
                </span>
                {/* 내용 */}
                <p className="truncate text-[#5f5f5f] text-sm font-normal leading-tight">
                  {el.contents}
                </p>
              </div>
              {/* 위치 */}
              <div className="flex items-center">
                <LocationIcon />
                <span className="truncate text-[#777777] text-[13px] font-semibold leading-tight">
                  {`${
                    el.addressCity === "서울"
                      ? el.addressCity + "시"
                      : el.addressCity
                  } ${el.addressTown}`}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p>등록된 플레이스가 없습니다</p>
        )}
      </div>
    </div>
  );
}
