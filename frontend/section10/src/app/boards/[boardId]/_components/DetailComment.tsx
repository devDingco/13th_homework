import DetailCommentList from "./DetailCommentList";
import DetailCommentWrite from "./DetailCommentWrite";

export default function DetailCommentForm({ boardId }: IDeteailCommentProps) {
  return (
    <div className="flex flex-col gap-10">
      <DetailCommentWrite boardId={boardId} />
      <DetailCommentList boardId={boardId} />
    </div>
  );
}
