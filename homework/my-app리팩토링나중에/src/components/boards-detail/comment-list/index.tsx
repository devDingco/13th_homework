"use client";

import CommentListItem from "../comment-list-item";
import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function CommentListUI() {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });
  console.log(data);

  //TODO: 아왜 무한스크롤 안되는데!!!!!!!
  // 무한 스크롤
  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil(data.fetchBoardComments.length ?? 10 / 10 + 1),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments) {
          setHasMore(false);
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
        loader={<div>로딩중</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
        // dataLength-> 현재 화면에 렌더링되고 있는 데이터 항목의 수
        // 무한 스크롤은 dataLength 속성을 이용해 데이터가 추가적으로 로드되어야 하는지 , 아니면 이미 모든 데이터를 로드했는지 판단
        scrollableTarget="scrollableDiv"
      >
        {data?.fetchBoardComments.map((el) => (
          <CommentListItem key={el._id} el={el} boardCommentId={el._id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
