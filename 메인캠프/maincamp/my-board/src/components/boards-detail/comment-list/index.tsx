import CommentListItem from '../comment-list-item';
import { IBoardComment, ICommentWrite } from '../comment-write/types';
import { useCommentList } from './hooks';
import styles from './styles.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CommentList() {
  const { data, onNext, hasMoreComment } = useCommentList();
  // console.log('data', data);
  return (
    <div className={`container ${styles.container}`}>
      {data?.fetchBoardComments && data?.fetchBoardComments.length > 0 ? (
        <div className="w-full">
          <InfiniteScroll
            next={onNext}
            hasMore={hasMoreComment}
            loader={<div>댓글 로딩중...</div>}
            dataLength={data?.fetchBoardComments.length ?? 0}
          >
            {data?.fetchBoardComments?.map((el: IBoardComment) => (
              <CommentListItem el={el} key={el._id} />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="w-full flex justify-center prose-r_14_20 mb-20 text-gray-600">
          등록된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
