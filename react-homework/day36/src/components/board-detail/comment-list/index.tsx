import styles from "./styles.module.css";
import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentListItem from "../comment-list-item";

const CommentList = () => {
  const { comments, onNext, hasMore } = useCommentList();
  return (
    <div className={styles.comment_list_body}>
      <div className={styles.comment_list}>
        {comments.length > 0 ? (
          <InfiniteScroll
            next={onNext}
            hasMore={hasMore}
            loader={<div>로딩중...</div>}
            dataLength={comments.length ?? 0}
          >
            {comments.map((comment) => (
              <CommentListItem key={comment._id} comment={comment} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className={styles.no_comments}>등록된 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default CommentList;
