import React from "react";
import CommentItem from "../comment-list-item";
import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
export default function CommentListPage() {
  const { data, onNext, hasMore } = useCommentList();

  return (
    <>
      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments?.length ?? 0}
      >
        {data?.fetchBoardComments ? (
          data.fetchBoardComments.map((el, index) => (
            <CommentItem el={el} key={el._id} index={index} />
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </InfiniteScroll>
    </>
  );
}
