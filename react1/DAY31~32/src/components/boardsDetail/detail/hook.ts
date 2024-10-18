/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { FETCH_BOARD } from '@/commons/queries/fetchBoard';

export const useBoardsDetail = () => {
    const { dispatch, setYoutubeUrl, setBoardAddress, boardId } =
        useAppContext();

    const router = useRouter();
    const { data, loading, error } = useQuery(FETCH_BOARD, {
        variables: { boardId: boardId },
    });

    useEffect(() => {
        if (!boardId) {
            console.error('boardId가 없습니다.');
            return; // Exit early if boardId is not available
        }
    }, [boardId]);

    useEffect(() => {
        if (data && data.fetchBoard) {
            const boardData = data.fetchBoard;

            dispatch({
                type: 'SET_YOUTUBE_URL',
                payload: boardData.youtubeUrl,
            });
            dispatch({
                type: 'SET_BOARD_ADDRESS',
                payload: boardData.boardAddress,
            });

            setYoutubeUrl(boardData.youtubeUrl);
            setBoardAddress(boardData.boardAddress);
        }
    }, [data, dispatch, setYoutubeUrl, setBoardAddress]);

    const handleOnClickList = () => {
        console.log('boards list');
        router.replace('/boards/');
    };

    if (!boardId) {
        console.error('boardId가 없습니다.');
    }

    return {
        data,
        loading,
        error,
        handleOnClickList,
    };
};
