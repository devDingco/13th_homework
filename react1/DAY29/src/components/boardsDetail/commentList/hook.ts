import {
    DeleteBoardCommentDocument,
    FetchBoardCommentsDocument,
} from '@/commons/graphql/graphql';
import { useAppContext } from '@/contexts/AppContext';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

export default function useCommentList() {
    const { boardId } = useAppContext();
    const router = useRouter();

    const [deleteBoardComment] = useMutation(DeleteBoardCommentDocument);
    const { data, refetch } = useQuery(FetchBoardCommentsDocument, {
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
                        query: FetchBoardCommentsDocument,
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
