import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment";
import useCommentList from "./hook";
import styles from "./styles.module.css";
import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

interface ICommentListProps {
  comments: FetchBoardCommentsQuery | undefined;
  hasMore: boolean;
  toggleHasMoreScroll: () => void;
}

const CommentList = ({
  comments,
  hasMore,
  toggleHasMoreScroll,
}: ICommentListProps) => {
  const { data, fetchDataOnScroll } = useCommentList({ toggleHasMoreScroll });

  return (
    <div className={styles.boardCommentContainer}>
      <InfiniteScroll
        next={fetchDataOnScroll}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments.length ?? 0}
      >
        <div className={styles.commentsContainer}>
          {comments?.fetchBoardComments.map((el) => (
            <Comment key={el._id} comments={el} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CommentList;
