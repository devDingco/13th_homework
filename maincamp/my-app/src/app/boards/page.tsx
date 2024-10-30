"use client"

import BoardsList from "@/components/boards-list/list"
import styles from "./css/styles.module.css"
import { useQuery } from "@apollo/client"
import { FetchBoardsCountDocument, FetchBoardsDocument } from "@/commons/graphql/graphql"
import ListPagination from "@/components/boards-list/pagination"

export default function BoardsListPage() {
    const {data, refetch} = useQuery(FetchBoardsDocument);

    const {data: dataBoardsCount} = useQuery(FetchBoardsCountDocument);

    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

    return(
        <div className={styles.boardWrap}>
            <BoardsList data={data} />
            <ListPagination refetch={refetch} lastPage={lastPage} />
        </div>
    )
}