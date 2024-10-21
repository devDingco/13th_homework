'use client';

import BoardsComponentComment from '@/components/boards-detail/comments-write';
import BoardsComponentDetail from '../../../components/boards-detail/detail';
import BoardsComponentCommentList from '@/components/boards-detail/comments-list';

export default function BoardsDetailPage() {
    return (
        <>
            <BoardsComponentDetail />
            <BoardsComponentComment />
            <BoardsComponentCommentList />
        </>
    );
}
