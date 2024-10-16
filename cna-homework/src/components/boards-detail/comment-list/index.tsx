import styles from "./styles.module.css";
import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import UseCommentListItem from "../comment-list-item";

export default function CommentList() {
  const { data, onNext, hasMore } = useCommentList();

  return (
    <div className={styles.commentAllListContainer}>
      {data?.fetchBoardComments.length === 0 ? (
        <div className={styles.noComment}>등록된 댓글이 없습니다.</div>
      ) : (
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          loader={<div>로딩중입니다...</div>}
          dataLength={data?.fetchBoardComments.length ?? 0} // 현재까지 로드된 데이터 길이
        >
          {data?.fetchBoardComments.map((el,index) => (
            <UseCommentListItem key={el._id} el={el} index={index} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
