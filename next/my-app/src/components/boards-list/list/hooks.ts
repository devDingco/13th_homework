
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteBoardDocument } from '@/commons/graphql/graphql';
import { FETCH_BOARDS } from './queries';
import { Modal } from 'antd';

export default function useBoardList() {
    const router = useRouter();
    const params = useParams();
    const [삭제함수이름] = useMutation(DeleteBoardDocument);

    const { data, refetch } = useQuery(FETCH_BOARDS);

    const onClickMoveToDetailPage =  (event) => {
        Modal.info({
            title: 'This is an information',
            content: '상세페이지로 이동합니다',
        });
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

        Modal.error({
            title: 'This is an information ',
            content: '삭제버튼을 눌렀군요',
        });
    };

    return {
        data,
        refetch,
        onClickMoveToDetailPage,
        onClickDelete,
    };
}
