'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteBoardDocument } from '@/commons/graphql/graphql';
import { FETCH_BOARDS } from './queries';

export default function useBoardList() {
    const router = useRouter();
    const params = useParams();
    const [삭제함수이름] = useMutation(DeleteBoardDocument);

    const { data } = useQuery(FETCH_BOARDS, {
        variables: {
            boardId: String(params.boardId),
        },
    });

    const onClickMoveToDetailPage = async (event: any) => {
        alert('상세페이지로 이동합니다');
        // console.log(event.currentTarget.id);
        router.push(`/boards/${event.currentTarget.id}`);
    };

    const onClickDelete = (event: any) => {
        event.stopPropagation();
        삭제함수이름({
            variables: {
                boardId: event.target.id,
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
