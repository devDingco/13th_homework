'use client';
import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';
import BoardsDetail from '@/components/boards-detail/detail';

export default function BoardsDetailPage() {
  return (
    <div className="flex flex-col">
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </div>
  );
}
