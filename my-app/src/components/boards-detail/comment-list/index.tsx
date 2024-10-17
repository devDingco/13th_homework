import Image from "next/image";
import styles from "./styles.module.css";

import useBoardsDetailCommentList from "./hook";
import CommentItem from "../comment-list-item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function BoardsDetailCommentList() {
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchMore } = useBoardsDetailCommentList();
  console.log(data?.fetchBoardComments.length);
  const onNext = () => {
    // data가 없다면 실행 못하게 바로 리턴해서 종료
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      // updateQuery => fetchMore안에 내장된 기능이며 기존에 받은 쿼리를 업데이트 해주는 기능
      updateQuery: (prev, { fetchMoreResult }) => {
        // fetchMoreResult.fetchBoardComments(새로 불러온 글이 0이면 더이상 불러오지 않고 리턴으로 종료)
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
      <main>
        {/* 
          next => 새로운 데이터를 로드하는 함수를 지정하는 역할
          hasMore => 추가로 불러올 데이터가 남아있는지 없는지 불리언 값으로 나타냄(true or false)
          loader => 데이터 불러오는 동안 보여줄 컴포넌트 or 메세지
          dataLength => 현재까지 불러온 데이터의 길이를 지정함.
        */}
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          loader={<div>로딩중 입니다.</div>}
          dataLength={data?.fetchBoardComments.length ?? 0}
        >
          {data?.fetchBoardComments?.map((el) => (
            <CommentItem el={el} key={el._id} />
          ))}
        </InfiniteScroll>
      </main>
    </div>
  );
}
