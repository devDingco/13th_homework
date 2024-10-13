"use client";
import BoardList from "@/components/board-list";

export default function BoardsPage() {
  return (
    <div className="mainContent">
      <h3 className="text-2xl font-bold">게시글 리스트</h3>
      <BoardList />
    </div>
  );
}
