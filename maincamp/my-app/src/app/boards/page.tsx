"use client"

import BoardsList from "@/components/boards-list/list"
import styles from "./css/styles.module.css"
import { useQuery } from "@apollo/client"
import { FetchBoardsCountDocument, FetchBoardsDocument } from "@/commons/graphql/graphql"
import ListPagination from "@/components/boards-list/pagination"
import { useState } from "react"
import { FETCH_BOARDS } from "@/components/boards-list/list/queries"

export default function BoardsListPage() {
    const [page, setPage] = useState<number>(1)
    const {data, refetch} = useQuery(FETCH_BOARDS,{
        variables: {page: page}
    });

    return(
        <div className={styles.boardWrap}>
            <BoardsList data={data} page={page} refetch={refetch} />
            <ListPagination page={page} setPage={setPage} refetch={refetch} data={data} />
        </div>
    )
}