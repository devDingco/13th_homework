"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "../../queries";

import { useRouter } from "next/navigation";
import ListFormBlock from "./ListFromBlock";

export default function ListForm() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <div className="flex flex-col items-center shadow-lg w-[1280px] h-[656px] mt-5 ">
      <div className="w-[1184px] h-[608px] flex-col gap-2">
        <div className="flex items-center h-[52px] gap-2 prose-me_16_20  px-6 py-4">
          <div className="flex justify-center w-16">번호</div>
          <div className="w-full">제목</div>
          <div className="flex justify-center w-24">작성자</div>
          <div className="flex justify-center w-24 ">날짜</div>
        </div>
        <div className="flex flex-col gap-3">
          {data?.fetchBoards.map((el: IListBoard, idx: number) => (
            <ListFormBlock el={el} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
