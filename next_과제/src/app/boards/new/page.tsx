import BoardWrite from "@/components/board-write";

export default function BoardsNewPage() {
  return (
    <div className="mainContent">
      <BoardWrite title="게시글 등록" formType="write" />
    </div>
  );
}
