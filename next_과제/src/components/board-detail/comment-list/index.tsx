"use client";
// import StarCountBox from "@/components/starCountBox";

import { IcommentItemBox } from "@/components/board-detail/comment-list/types";
import { useCommentList } from "@/components/board-detail/comment-list/hook";
import CommentItem from "@/components/commentItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CommentList(props: IcommentItemBox) {
  const { starCountBox = true, reply = false } = props;

  const { data, error, loading, fetchMoreData, hasMore } = useCommentList();

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="pb-28">
      <InfiniteScroll
        dataLength={data?.fetchBoardComments.length || 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {data?.fetchBoardComments.map((commentData) => (
          <CommentItem
            key={commentData._id}
            commentData={commentData}
            starCountBox={starCountBox}
            reply={reply}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
