"use client";
import { useQuery } from "@apollo/client";
import CommentItem from "@/components/15-06-infinite-scroll";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Page() {
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: "670dbd425413b3002914d39b", page: 1 },
  });

  const onNext = () => {
    if (data === undefined) return; // data가 없을 때는 실행하지 않음

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          // 추가로 불러올 데이터가 없는 경우
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
    <div
      id="scrollableDiv"
      // className="flex flex-col gap-5"
      style={{
        height: 200,
        overflow: "auto",
        display: "flex",
      }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        style={{ display: "flex", flexDirection: "column" }}
        next={onNext}
        hasMore={hasMore}
        loader={<div>로딩중입니다...</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
      >
        {data?.fetchBoardComments.map((commentData) => (
          <CommentItem key={commentData._id} commentData={commentData} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
