"use client";

import Image from "next/image";
import useBoards from "./hook";
import PageButton from "../pagination";

export default function Boards({ data, refetch }) {
  const {
    currentPage,
    boardsCount,
    onClickBoard,
    onClickDeleteBoard,
    setCurrentPage,
  } = useBoards({ data });

  return (
    <div className="w-[1280px] mx-auto min-w-[680px] px-12 py-6 rounded-2xl shadow-[0px_0px_20px_0px_#00000014] mb-[100px]">
      <div className="flex flex-col iw-full gap-2">
        <div className="flex w-full px-6 py-4 gap-2">
          <div className="w-16 text-center font-medium text-4 leading-5 text-[#1c1c1c]">
            번호
          </div>
          <div className="w-full font-medium text-4 leading-5 text-[#1c1c1c]">
            제목
          </div>
          <div className="w-[100px] font-medium text-4 leading-5 text-[#1c1c1c] text-center">
            작성자
          </div>
          <div className="w-[100px] font-medium text-4 leading-5 text-[#1c1c1c] text-center">
            날짜
          </div>
        </div>
        {data?.fetchBoards.map((el, index) => (
          <div
            key={el._id}
            className="flex items-center w-full py-3 pl-6 pr-0 gap-2 border border-solid border-[#F2F2F2] group"
            onClick={() => onClickBoard(el._id)}
          >
            <div className="w-16 text-center font-light text-[14px] leading-5 text-[#919191]">
              {index + 1}
            </div>
            <div className="w-full font-medium text-4 leading-5 text-[#1c1c1c]">
              {el.title}
            </div>
            <div className="w-[100px] text-center font-light text-[14px] leading-5 text-[#333333]">
              {el.writer}
            </div>
            <div className="w-[100px] text-center font-light text-[14px] leading-5 text-[#919191] ">
              {el.createdAt.split("T")[0].replace(/-/g, ".")}
            </div>
            <div
              id={el._id}
              className="w-6 h-4 relative invisible group-hover:visible"
              onClick={onClickDeleteBoard}
            >
              <Image
                src="/img/delete.svg"
                alt="deleteImg"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        ))}
        <PageButton
          currentPage={currentPage}
          boardsCount={boardsCount}
          refetch={refetch}
          setCurrentPage={setCurrentPage}
          data={data}
        />
      </div>
    </div>
  );
}
