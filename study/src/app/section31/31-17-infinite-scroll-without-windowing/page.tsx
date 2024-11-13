"use client";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_BOARDS, {
    variables: { page: 1 },
  });

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: { page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1 },
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
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 200,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InfiniteScroll
          dataLength={data?.fetchBoards.length ?? 0}
          next={onNext}
          style={{ display: "flex", flexDirection: "column" }}
          hasMore={hasMore}
          loader={<></>} // 스크롤하여 추가로 더 받아와도 가상스크롤로 데이터 갯수는 동일하여 로딩이 풀리지 않음
          scrollableTarget="scrollableDiv" // 스크롤대상 <List /> 컴포넌트로 변경
        >
          {data?.fetchBoards.map((el) => (
            <div key={el._id} className="border">
              <span style={{ margin: "10px" }}>{el.writer}</span>
              <span style={{ margin: "10px" }}>{el.title}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
