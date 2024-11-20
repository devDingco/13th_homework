"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FixedSizeList as List } from "react-window";

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
        loader={<></>}
        dataLength={data?.fetchBoards.length ?? 0}
        scrollableTarget="스크롤대상ID" // <List/> 컴포넌트의 id를 스크롤대상 id로 바꾸기
      >
        <List
          itemData={data?.fetchBoards}
          height={300}
          itemCount={data?.fetchBoards.length}
          width={"100%"}
          itemSize={50}
          outerElementType={전체를감싸는태그} // 이 태그로 대상이 감싸지게됨
        >
          {({ index, style, data }) => (
            <div style={style}>
              <span>{data[index].title}</span>
              <span>{data[index].writer}</span>
            </div>
          )}
        </List>
      </InfiniteScroll>
      <Link href="/section31/31-18-infinite-scroll-with-windowing-moved">
        페이지이동하기
      </Link>
    </div>
  );
}
const 전체를감싸는태그 = (props) => <div id="스크롤대상ID" {...props} />;
