'use client';
import InfiniteScroll from 'react-infinite-scroll-component';
import useBoardListCommentList from './hook';
import CommentItem from '../comment-list-item';

export default function BoardsComponentCommentList() {
    const { data, hasMore, onNext } = useBoardListCommentList();

    // console.log(data);

    return (
        <>
            <InfiniteScroll
                next={onNext}
                hasMore={hasMore}
                loader={
                    <div>
                        로딩중입니다로딩중입니다로딩중입니다로딩중입니다로딩중입니다로딩중입니다로딩중입니다로딩중입니다
                    </div>
                }
                dataLength={data?.fetchBoardComments.length ?? 0}
            >
                {data?.fetchBoardComments.length > 0 ? (
                    data.fetchBoardComments.map(
                        (commentData: any, index: any) => (
                            <CommentItem
                                key={commentData._id}
                                commentData={commentData}
                            />
                        )
                    )
                ) : (
                    <div>이거슨 데이터가 없을 때</div>
                )}
            </InfiniteScroll>
        </>
    );
}
