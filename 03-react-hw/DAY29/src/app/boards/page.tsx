"use client";

import BoardsList from "@/components/boards-list/list";
import useBoardsList from "@/components/boards-list/list/hook";
import Search from "@/components/boards-list/list/search";

export default function BoardsPage() {
  const boardsState = useBoardsList(); //여기서 사용해야지 검색하면 search하면 BoardsList가 변경가능

  return (
    <div className="flex justify-center w-full">
      <div className="pt-10 flex flex-col gap-6 justify-center min-w-[630px]">
        <span className="text-black text-[28px] font-bold leading-9 w-full">
          트립토크 게시판
        </span>
        <Search
          onChangeSearch={boardsState.onChangeSearch}
          onDateChange={boardsState.onDateChange}
        />
        <BoardsList
          data={boardsState.data}
          keyword={boardsState.keyword}
          handleDelete={boardsState.handleDelete}
          isHovered={boardsState.isHovered}
          setIsHovered={boardsState.setIsHovered}
        />
      </div>
    </div>
  );
}
