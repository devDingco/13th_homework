"use client";
import { FETCH_COUNT, FETCH_LIST } from "@/commons/queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import BoardsListUI from "@/components/Organisms/BoardsList";
import LayoutPagination from "@/components/Organisms/pagination";

export default function BoardsListPage() {
    const [current, setCurrent] = useState(0);
    const { data, refetch } = useQuery(FETCH_LIST);

    const { data: count } = useQuery(FETCH_COUNT);
    const lastPage = Math.ceil((count?.fetchBoardsCount ?? 10) / 10);
    console.log(count);
    console.log(Number(count?.fetchBoardsCount));

    return (
        <>
            <BoardsListUI data={data} count={count} current={current} />
            <LayoutPagination
                refetch={refetch}
                lastPage={lastPage}
                current={current}
                setCurrent={setCurrent}
            />
        </>
    );
}
