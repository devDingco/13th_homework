'use client';

import BoardsListUI from '@/components/boardsList/list';
import { IBoardData } from '@/app/types/IBoarData';
import { FETCH_BOARDS } from '@/commons/queries/fetchBoards';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Pagination from '@/components/boardsList/pagination';
import InfiniteScroll from '@/components/boardsList/InfiniteScroll';

export default function BoardsListPage(): JSX.Element {
    const [data, setData] = useState<IBoardData[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { fetchMore, data: initialData } = useQuery(FETCH_BOARDS, {
        variables: {
            skip: 0,
            take: 10,
        },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (initialData) {
            setData(initialData.fetchBoards);
            setTotalItems(initialData.fetchBoards.length);
            setHasMore(initialData.fetchBoards.length === 10);
        }
    }, [initialData]);

    const loadMore = async (): Promise<void> => {
        if (loading || !hasMore) return;
        setLoading(true);

        const nextPage = data.length / 10 + 1;
        try {
            const { data: newBoards } = await fetchMore({
                variables: {
                    skip: nextPage * 10,
                    take: 10,
                },
            });
            setData((prevData) => [...prevData, ...newBoards.fetchBoards]);
            setTotalItems(initialData.fetchBoards.length);
            setHasMore(initialData.fetchBoards.length === 10);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <BoardsListUI />
            <InfiniteScroll
                onLoadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
            />
            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                pageSize={10}
                onPageChange={handlePageChange}
            />
        </>
    );
}
