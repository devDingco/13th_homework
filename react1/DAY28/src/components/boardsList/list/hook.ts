import { DELETE_BOARD } from '@/commons/queries/deleteBoard';
import { FETCH_BOARDS } from '@/commons/queries/fetchBoards';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

export default function useBoardsList() {
    const router = useRouter();

    const { data, loading, error } = useQuery(FETCH_BOARDS);
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const handleOnClick = (_id) => {
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
                optimisticResponse: {
                    deleteBoard: true,
                },
                update: (cache) => {
                    const data: any = cache.readQuery({ query: FETCH_BOARDS });
                    if (data?.fetchBoards) {
                        const updateBoards = data.fetchBoards.filter(
                            (board: { _id: string }) =>
                                board._id !== e.currentTarget.id
                        );

                        cache.writeQuery({
                            query: FETCH_BOARDS,
                            data: { fetchBoards: updateBoards },
                        });
                    }
                },
                refetchQueries: [{ query: FETCH_BOARDS }],
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
