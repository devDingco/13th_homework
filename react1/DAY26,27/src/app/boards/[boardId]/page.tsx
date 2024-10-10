'use client';

import { useParams } from 'next/navigation';

import BoardsDetailUI from '@/components/boardsDetail/detail';
import CommentWriteUI from '@/components/boardsDetail/commentWrite';
import CommentListUI from '@/components/boardsDetail/commentList';

export default function BoardsDetailPage(): JSX.Element {
    const { boardId } = useParams();

    if (!boardId || typeof boardId !== 'string') {
        return <p>Loading...</p>;
    }
    return (
        <>
            <BoardsDetailUI />
            <CommentWriteUI boardId={boardId} />
            <CommentListUI boardId={boardId} />
        </>
    );
}
