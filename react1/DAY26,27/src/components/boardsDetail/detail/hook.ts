import { useParams, useRouter } from 'next/navigation';
import { FETCH_BOARD } from '@/commons/queries/fetchBoard';
import { useQuery } from '@apollo/client';

export const useBoardsDetail = () => {
    const { boardId } = useParams();
    const router = useRouter();

    const { data, loading, error } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    });

    const handleOnClickList = () => {
        console.log('boards list');
        router.replace('/boards/');
    };
    // const handleComment = () => { };

    return {
        boardId,
        data,
        loading,
        error,
        handleOnClickList,
    };
};
