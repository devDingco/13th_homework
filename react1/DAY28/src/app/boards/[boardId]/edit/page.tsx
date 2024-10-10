'use client';

import { FETCH_BOARD } from '@/commons/queries/fetchBoard';
import BoardsNewUI from '@/components/boardsWrite';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export default function BoardsEditPage() {
    const { boardId } = useParams();

    const { data, loading, error } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { fetchBoard } = data;
    console.log(fetchBoard);

    return (
        <BoardsNewUI isEdit={true} data={fetchBoard} showResetButton={true} />
    );
}
