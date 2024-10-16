'use client';

import { useParams, useRouter } from 'next/navigation';
import { DELETE_BOARD, FETCH_BOARDS } from './queries';
import { useMutation, useQuery } from '@apollo/client';

export default function useBoardList() {
    const router = useRouter();
    const params = useParams();

    const { data } = useQuery(FETCH_BOARDS, {
        variables: {
            mynumber: params.boardId,
        },
    });

    const onClickMoveToDetailPage = async (event) => {
        // router.push(`/boards/${data.fetchBoards._id}`);
        alert('자리 옮겨여');
    };

    const [삭제함수이름] = useMutation(DELETE_BOARD);

    const onClickDelete = (event) => {
        event.stopPropagation();
        삭제함수이름({
            variables: {
                mynumber: event.target.id,
            },
            refetchQueries: [{ query: FETCH_BOARDS }],
        });
        alert('삭제버튼을 눌렀군요');
    };

    return {
        data,
        onClickMoveToDetailPage,
        onClickDelete,
    };
}
