"use client";
import styles from "./style.module.css";
import useCommentListPage from "./hooks";
import { ICommentListPageprops } from "./types";
import CommentItem from "../comment-list-item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function CommentListPage(props: ICommentListPageprops) {
  const { data, fetchMore } = useCommentListPage(); // refetch 추가

  const onNext = () => {
    if (!data?.fetchBoardComments.length) return;
    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          props.setHasMore(false);
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
        hasMore={props.hasMore}
        loader={<div></div>}
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
