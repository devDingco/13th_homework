import { DELETE_BOARD_COMMENT } from '@/commons/queries/deleteBoardComment';
import { FETCH_BOARD_COMMENTS } from '@/commons/queries/fetchBoardComments';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

export default function useCommentList(boardId: string) {
    const router = useRouter();

    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);
    const { data, refetch } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: { boardId },
    });

    const handleOnclickDelete = async (commentId: string, password: string) => {
        try {
            await deleteBoardComment({
                variables: {
                    password,
                    boardCommentId: commentId,
                },
                refetchQueries: [
                    {
                        query: FETCH_BOARD_COMMENTS,
                        variables: { boardId },
                    },
                ],
            });
            router.push('../commentWrite/index.tsx');
        } catch (error) {
            console.log('에러가 났어요', error);
        }
    };

    return {
        data,
        handleOnclickDelete,
        refetch,
    };
}
