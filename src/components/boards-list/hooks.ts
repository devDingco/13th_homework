'use client';

import { useParams, useRouter } from 'next/navigation';
import { FETCH_BOARDS } from './queries';
import { useMutation, useQuery } from '@apollo/client';
import {
    DeleteBoardDocument,
    FetchBoardDocument,
} from '@/commons/graphql/graphql';

export default function useBoardList() {
    const router = useRouter();
    const params = useParams();

    const { data } = useQuery(FetchBoardDocument, {
        variables: {
            boardId: params.boardId,
        },
    });

    const onClickMoveToDetailPage = async (event) => {
        // router.push(`/boards/${data.fetchBoards._id}`);
        alert('자리 옮겨여');
    };

    const [삭제함수이름] = useMutation(DeleteBoardDocument);

    const onClickDelete = (event) => {
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
