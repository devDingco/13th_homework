"use client";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FixedSizeList as List } from "react-window";

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
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

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
    <div>
      <InfiniteScroll
        dataLength={data?.fetchBoards.length ?? 0}
        next={onNext}
        hasMore={hasMore}
        loader={<></>} // 스크롤하여 추가로 더 받아와도 가상스크롤로 데이터 갯수는 동일하여 로딩이 풀리지 않음
        scrollableTarget="스크롤대상ID" // 스크롤대상 <List /> 컴포넌트로 변경
      >
        <List
          height={300}
          itemCount={data?.fetchBoards.length}
          itemSize={50}
          width={"100%"}
          itemData={data?.fetchBoards}
          outerElementType={전체를감싸는태그}
        >
          {({ index, style, data }) => (
            <div style={style}>
              <span style={{ margin: "10px" }}>{data[index].title}</span>
              <span style={{ margin: "10px" }}>{data[index].writer}</span>
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
}

const 전체를감싸는태그 = (props) => <div id="스크롤대상ID" {...props} />;
