"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import useCommentList from "./hook";
import { Rate } from "antd";
import styles from "./styles.module.css";

const CommentListComponent = () => {
  const { data, onNext, isHasMore } = useCommentList();

  return (
    <div className={styles.comment}>
      <InfiniteScroll
        next={onNext}
        hasMore={isHasMore}
        loader={<div>로딩중입니다</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
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
