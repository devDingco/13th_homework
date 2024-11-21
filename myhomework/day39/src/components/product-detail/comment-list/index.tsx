"use client";

import styles from "./styles.module.css";
import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "../comment-list-item";

export default function CommentList() {
  const { data, noComments, onNext } = useCommentList();

  return (
    <div className={styles.commentListLayout}>
      <div className={styles.commentListBox}>
        <InfiniteScroll
          next={onNext}
          hasMore={true}
          loader={<div></div>}
          dataLength={data?.fetchBoardComments.length ?? 0}
        >
          {noComments ? (
            <div className={styles.noComments}>등록된 댓글이 없습니다.</div>
          ) : (
            data?.fetchBoardComments.map((comment, index) => (
              <CommentItem
                comment={comment}
                index={index}
                totalComments={data?.fetchBoardComments.length} // 전체 댓글 수 전달
              />
            ))
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
