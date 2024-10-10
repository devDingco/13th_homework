'use client';

import { useParams } from 'next/navigation';

import BoardsDetailUI from '@/components/boardsDetail/detail';

export default function BoardsDetailPage(): JSX.Element {
    const { boardId, userId } = useParams<{
        boardId: string;
        userId: string | '';
    }>();

    if (!boardId || typeof boardId !== 'string') {
        return <p>Loading...</p>;
    }
    return (
        <>
            <BoardsDetailUI boardId={boardId} userId={userId} />
        </>
    );
}
