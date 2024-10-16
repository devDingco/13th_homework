'use client';

import { FETCH_BOARD } from '@/commons/queries/fetchBoard';
import BoardsDetailUI from '@/components/boardsDetail/detail';
import { useAppContext } from '@/contexts/AppContext';
import { useQuery } from '@apollo/client';

export default function BoardsDetailPage(): JSX.Element {
    const { boardId } = useAppContext();

    const { data, loading, error } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { fetchBoard } = data || {};
    if (!fetchBoard) {
        return <p>No board data available.</p>;
    }
    return (
        <>
            <BoardsDetailUI data={fetchBoard} />
        </>
    );
}
