'use client';

import BoardsComponentComment from '@/components/boards-detail/comments-write';
import BoardsComponentDetail from '../../../components/boards-detail/detail';
import BoardsComponentCommentList from '@/components/boards-detail/comments-list';
import BoardsComponentListBanner from '@/components/boards-list/banner';

export default function BoardsDetailPage() {
    return (
        <>
            <BoardsComponentDetail />
            <BoardsComponentComment />
            <BoardsComponentCommentList />
        </>
    );
}
