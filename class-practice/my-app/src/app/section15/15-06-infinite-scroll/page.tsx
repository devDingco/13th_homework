"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const FETCH_BOARDS = gql`
  query fetchBoardshello($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  const onNext = () => {
    if (!data?.fetchBoards.length) return;

    fetchMore({
      variables: { mypage: Math.ceil(data?.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards?.length) {
          setHasMore(false);
          return;
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
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
        dataLength={data?.fetchBoards.length ?? 0}
      >
        {data?.fetchBoards.map((el) => (
          <div key={el._id}>
            <span>{el.title}</span>
            <span>{el.writer}</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
