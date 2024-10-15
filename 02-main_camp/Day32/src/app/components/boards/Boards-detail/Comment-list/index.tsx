import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment";
import useCommentList from "./hook";
import styles from "./styles.module.css";

const CommentList = () => {
  const { data, hasMore, fetchDataOnScroll, resetHasMoreScroll } =
    useCommentList();

  return (
    <div className={styles.boardCommentContainer}>
      <InfiniteScroll
        next={fetchDataOnScroll}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
      >
        {data?.fetchBoardComments.map((el) => (
          <Comment
            key={el._id}
            writer={String(el.writer)}
            contents={el.contents}
            rating={el.rating}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentList;
