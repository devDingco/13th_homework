import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

import { useParams } from "next/navigation";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "../comment-list-item";

export default function CommentList() {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const { data: dataCommentList, fetchMore } = useQuery(
    FetchBoardCommentsDocument,
    {
      variables: {
        boardId: String(params.boardId),
      },
    },
  );
  console.log("🚀 ~ CommentList ~ dataCommentList:", dataCommentList);

  const onNext = () => {
    if (!dataCommentList?.fetchBoardComments.length) {
      return;
    }
    fetchMore({
      variables: {
        page: Math.ceil(dataCommentList?.fetchBoardComments.length / 10) + 1,
        boardId: params.boardId as string,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments.length) {
          setHasMore(false);
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
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
    <div className="w-full max-w-7xl">
      {dataCommentList?.fetchBoardComments.length ? (
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          loader={<div>댓글 불러오기..</div>}
          dataLength={dataCommentList?.fetchBoardComments.length ?? 0}
          className="flex flex-col items-center gap-10"
        >
          {dataCommentList?.fetchBoardComments.map((el) => (
            <CommentItem commentItem={el} />
          ))}
        </InfiniteScroll>
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </div>
  );
}
