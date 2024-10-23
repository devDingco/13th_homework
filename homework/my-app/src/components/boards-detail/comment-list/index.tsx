"use client";
import styles from "./style.module.css";
import useCommentListPage from "./hooks";
import { ICommentListPageprops } from "./types";
import CommentItem from "../comment-list-item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function CommentListPage(props: ICommentListPageprops) {
  const { data, fetchMore } = useCommentListPage(); // refetch 추가
  const [hasMore, setHasMore] = useState(true);

  const onNext = () => {
    if (!data?.fetchBoardComments.length) return;
    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <div className={styles.container}>
      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
      >
        <div className={styles.commentContainer}>
          {data?.fetchBoardComments.length === 0 && (
            <div className={styles.noComments}>등록된 댓글이 없습니다.</div>
          )}

          {data?.fetchBoardComments.map((el) => (
            <CommentItem key={el._id} el={el} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
