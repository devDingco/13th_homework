"use client";
// import { FETCH_COUNT, FETCH_LIST } from "@/commons/queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import BoardsListUI from "@/components/Organisms/BoardsList";
import PaginationUI from "@/components/Molecules/Pagination";
import SearchUI from "@/components/Molecules/Search";

import { FetchBoardsCountDocument, FetchBoardsDocument } from "@/common/graphql/graphql";

export default function BoardsListPage() {
    const [keyword, setKeyword] = useState("");
    const [current, setCurrent] = useState(1);
    const { data, refetch } = useQuery(FetchBoardsDocument);

    const { data: count } = useQuery(FetchBoardsCountDocument);
    const lastPage = Math.ceil((count?.fetchBoardsCount ?? 10) / 10);

    return (
        <>
            <SearchUI refetch={refetch} keyword={keyword} setKeyword={setKeyword} />
            <BoardsListUI data={data} count={count} current={current} keyword={keyword} />
            <PaginationUI refetch={refetch} lastPage={lastPage} current={current} setCurrent={setCurrent} />
        </>
    );
}
