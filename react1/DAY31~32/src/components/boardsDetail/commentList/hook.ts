import { IBoardComment } from '@/app/types/IBoardComment';
import { FetchBoardCommentsDocument } from '@/commons/graphql/graphql';
import { useAppContext } from '@/contexts/AppContext';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function useCommentList() {
    const { boardId } = useAppContext();

    const [data, setData] = useState<IBoardComment[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { refetch } = useQuery(FetchBoardCommentsDocument, {
        variables: { boardId },
        skip: true,
        onCompleted: (result) => {
            setData(result.fetchBoardComments);
            setHasMore(result.fetchBoardComments.length === 10);
        },
    });

    const fetchComments = async ({
        boardId,
    }: {
        boardId: string;
    }): Promise<void> => {
        setLoading(true);
        try {
            const result = await refetch({ boardId });
            setData(result.data.fetchBoardComments);
            setHasMore(result.data.fetchBoardComments.length === 10);
        } catch (error) {
            console.error('댓글 로드 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments({ boardId });
    }, [boardId]);

    return {
        data,
        loading,
        hasMore,
        fetchComments,
    };
}
