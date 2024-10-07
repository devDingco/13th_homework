'use client';

import { FETCH_BOARD } from '@/app/graphql/fetchBoard';
import BoardsNew from '@/components/boardsWrite';
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

    return <BoardsNew isEdit={true} data={fetchBoard} />;
}
