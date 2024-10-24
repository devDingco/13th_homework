import styles from "./styles.module.css";
import useCommentList from "./hook";
import CommentListItem from "../comment-list-item";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CommentList() {
  const { data, handleDelete, isEdit, onEdit, loadMore, hasMore, resetList } =
    useCommentList();

  return (
    <InfiniteScroll
      dataLength={data?.fetchBoardComments.length ?? 0} // 현재 로드된 아이템 수
      next={loadMore} // 추가 데이터 로드 함수
      hasMore={hasMore} // 더 불러올 데이터가 있는지 여부
      loader={<h4>로딩중...</h4>} // 로딩 중 표시할 컴포넌트
      className={styles.commentsList_gap}
    >
      {data?.fetchBoardComments.map((el, index, array) => (
        <CommentListItem
          key={el._id}
          _id={el._id}
          writer={el.writer as string}
          rating={el.rating}
          contents={el.contents}
          createdAt={el.createdAt}
          isLast={index === array.length - 1}
          onDelete={() => handleDelete(el._id)}
          isEdit={isEdit}
          onEdit={onEdit}
          onSuccess={resetList}
        />
      ))}
    </InfiniteScroll>
  );
}
