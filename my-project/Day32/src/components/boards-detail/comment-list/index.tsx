import useCommentList from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentListItem from "../comment-list-item";

export default function CommentList() {
  const { data, hasMore, onNext } = useCommentList();
  return (
    <div className="w-[1280px] mx-auto">
      {data?.fetchBoardComments.length > 0 ? (
        <InfiniteScroll
          next={onNext}
          hasMore={hasMore}
          dataLength={data?.fetchBoardComments.length ?? 0}
          loader=""
        >
          <div className="flex flex-col gap-10">
            {data?.fetchBoardComments.map((el) => (
              <CommentListItem el={el} key={el._id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center">
          <div>등록된 댓글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}
