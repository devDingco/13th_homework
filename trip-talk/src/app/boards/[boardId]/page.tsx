import BoardsDetail from "../../_components/BoardsDetail/BoardsDetail";
import CommentList from "../../_components/CommentList/CommentList";
import CommentWrite from "../../_components/CommentWrite/CommentWrite";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
