import {
    DeleteBoardDocument,
    FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

export default function useBoardsList() {
    const router = useRouter();

    const { data, loading, error } = useQuery(FetchBoardsDocument);
    const [deleteBoard] = useMutation(DeleteBoardDocument);

    const handleOnClick = (_id: string) => {
        router.push(`/boards/${_id}`);
    };

    const handleOnClickDelete = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            await deleteBoard({
                variables: {
                    boardId: String(e.currentTarget.id),
                },
                // optimisticResponse: {
                //     deleteBoard,
                // },
                update: (cache) => {
                    const data = cache.readQuery({
                        query: FetchBoardsDocument,
                    });
                    if (data?.fetchBoards) {
                        const updateBoards = data.fetchBoards.filter(
                            (board: { _id: string }) =>
                                board._id !== e.currentTarget.id
                        );

                        cache.writeQuery({
                            query: FetchBoardsDocument,
                            data: { fetchBoards: updateBoards },
                        });
                    }
                },
                refetchQueries: [{ query: FetchBoardsDocument }],
            });
            console.log('삭제 성공');
        } catch (error) {
            console.log('삭제오류', error);
        }
    };

    return {
        data,
        loading,
        error,
        handleOnClick,
        handleOnClickDelete,
    };
}
