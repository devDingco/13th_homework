'use client ';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FETCH_BOARD_COMMENTS } from './queries';

export default function useBoardListCommentList() {
    const [hasMore, setHasMore] = useState(true);
    const params = useParams();

    const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            boardId: String(params.boardId),
        },
    });

    const onNext = () => {
        if (data === undefined) return; // data가 없을때는 fetchMore 자체를 실행하면 안됨
        fetchMore({
            variables: {
                // data?.fetchBoards.length ?? 10 = data 안불러왔을 때 초기값 10
                mypage:
                    Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1, // 불러올페이지 = 지금페이지 + 1
            },
            //fetchMore 내장기능
            updateQuery: (prev, { fetchMoreResult }) => {
                // 추가로 받을 10개가 없다면 중지시켜줘야함
                if (!fetchMoreResult.fetchBoardComments?.length) {
                    setHasMore(false);
                    return;
                }
                return {
                    //이배열을 업데이트 해줄거야
                    fetchBoards: [
                        ...prev.fetchBoardComments, // 기존꺼 10개 업데이트
                        ...fetchMoreResult.fetchBoardComments, // 가져올 10개 업데이트
                    ],
                };
            },
        });
    };

    return {
        data,
        hasMore,
        setHasMore,
        fetchMore,
        useState,
        useParams,
        useQuery,
        onNext,
    };
}
