'use client ';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FETCH_BOARD_COMMENTS } from './queries';

export default function useBoardListCommnetList() {
    const [value, setValue] = useState(3);
    const params = useParams();

    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            boardId: String(params.boardId),
        },
    });

    console.log(data);

    return {
        data,
        useState,
        useParams,
        useQuery,
        value,
        setValue,
    };
}
