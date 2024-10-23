"use client"

import BoardsDetail from "@/components/boards-detail/detail"
import BoardListBanner from "@/components/boards-list/banner"
import BoardsList from "@/components/boards-list/list"
import { useListPagination } from "@/components/boards-list/pagination/hook"
import { IPagiNationProps } from "@/components/boards-list/pagination/types"
import { Pagination } from "antd"
import styles from "./css/styles.module.css"

export default function BoardsListPage(props:IPagiNationProps) {
    const {
        data
    } = useListPagination(props);

    return(
        <div className={styles.boardWrap}>
            <BoardsList />
            <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                align="center"
                current={props.page}
                total={data?.fetchBoardsCount}
                showSizeChanger={false}
                onChange={(page) => console.log(page)} // 페이지 변경 시 동작
                className={styles.pagination}
            />
        </div>
    )
}