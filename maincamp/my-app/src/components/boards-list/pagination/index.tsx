"use client"

import {useListPagination} from "./hook"
import { IPagiNationProps } from "./types"
import styles from "./styles.module.css"
import { Pagination } from "antd"

export default function ListPagination(props:IPagiNationProps){
    const {
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
    } = useListPagination(props)


    return(
        <div className={styles.paginationWrap}>
            {/* <span onClick={onClickPrevPage} className={styles.listPrev}>이전</span>
            {new Array(10).fill("페이지").map(
                (_, index) =>
                    index + startPage <= props.lastPage && (
                        <span 
                            className={styles.paginationNumber}
                            key={index + startPage}
                            id={String(index + startPage)}
                            onClick={onClickPage}
                        >
                            {index + startPage}
                        </span>
                    )
            )}
            <span onClick={onClickNextPage} className={styles.listNext}>다음</span> */}
            <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                align="center"
                // current={props.page}
                // total={data?.fetchBoardsCount}
                showSizeChanger={false}
                onChange={(page) => console.log(page)} // 페이지 변경 시 동작
                className={styles.pagination}
                // refetch={refetch}
                // lastPage={lastPage}
            />
        </div>
    )
}