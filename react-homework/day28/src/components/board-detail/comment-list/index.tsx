import styles from "./styles.module.css";
import Comment from "./comment";
import { useCommentList } from "./hook";

const CommentList = () => {
  const { comments } = useCommentList();
  return (
    <div className={styles.comment_list_body}>
      <div className={styles.comment_list}>
        {comments.length > 0 ? (
          <Comment comments={comments} />
        ) : (
          <p className={styles.no_comments}>등록된 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default CommentList;
