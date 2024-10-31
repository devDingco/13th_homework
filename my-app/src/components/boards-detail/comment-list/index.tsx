"use client";

import CommentListItem from "../comment-list-item";
import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";

function CommentList() {
  const { data, fetchMore, hasMore, setHasMore } = useCommentList();

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 7) / 7) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return;
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
    <div>
      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
      >
        {data?.fetchBoardComments.map((el) => (
          <CommentListItem el={el} key={el._id} commentId={el._id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CommentList;
