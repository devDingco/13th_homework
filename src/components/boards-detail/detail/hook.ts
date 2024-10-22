'use client';

import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { FetchBoardDocument } from '@/commons/graphql/graphql';

export const useBoardDetail = () => {
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
    };

    const 날짜담는통 = options.year + '.' + options.month + '.' + options.date;

    const params = useParams();
    const router = useRouter();

    const { data } = useQuery(FetchBoardDocument, {
        variables: {
            boardId: String(params.boardId),
        },
    });

    const onClickMoveBoardList = () => {
        router.push('/boards');
    };

    const onClickMoveEditPage = () => {
        alert('수정페이지로 이동합니다');
        router.push(`/boards/${params.boardId}/edit`);
    };

    return {
        날짜담는통,
        data,
        onClickMoveBoardList,
        onClickMoveEditPage,
    };
};
