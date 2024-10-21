"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import useCommentList from "./hook";
import { Rate } from "antd";

const CommentListComponent = () => {
  const { data, fetchMore } = useCommentList();

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 5) / 5) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments === undefined) {
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
    <div>
      <InfiniteScroll
        dataLength={data?.fetchBoardComments.length ?? 0}
        next={onNext}
        hasMore={false} // 무한스크롤 일부러 막았습니다.
        loader={<div>로딩중입니다</div>}
      >
        {data?.fetchBoardComments.map((el) => (
          <div key={el._id}>
            <div>
              {/* <Image src={el.user.picture ?? ""} alt="profile" width={0} height={0} /> */}
              {/* <span>{el.user.name}</span> */}
              <Rate disabled defaultValue={el.rating} allowHalf />
            </div>
            <div>{el.contents}</div>
            <div>
              {el.createdAt.split("T")[0]}
              {el.createdAt !== el.updatedAt && <span>수정됨</span>}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentListComponent;
