import BoardsDetail from "../../components/BoardsDetail/BoardsDetail";
import CommentList from "../../components/CommentList/CommentList";
import CommentWrite from "../../components/CommentWrite/CommentWrite";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
