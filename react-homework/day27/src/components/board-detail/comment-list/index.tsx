import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Comment from "./comment";

const CommentList = () => {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: params.boardId as string },
  });
  console.log(data?.fetchBoardComments);
  const comments = data?.fetchBoardComments || [];
  return (
    <div>
      {comments.length > 0 ? (
        <Comment comments={comments} />
      ) : (
        <p>등록된 댓글이 없습니다.</p>
      )}
    </div>
  );
};
export default CommentList;
