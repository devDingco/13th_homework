"use client"

import {useListPagination} from "./hook"
import { IPaginationProps } from "./types"
import styles from "./styles.module.css"
import { Pagination } from "antd"

export default function ListPagination(props:IPaginationProps){
    const {
        data,
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
    } = useListPagination(props)


    return(
        <div className={styles.paginationWrap}>
            {/* <span onClick={onClickPrevPage} className={styles.listPrev}>이전</span>
            {new Array(10).fill("게시글").map(
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
            {/* <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                align="center"
                current={props.page}
                total={data?.fetchBoardsCount}
                showSizeChanger={false}
                onChange={(page) => console.log(page)} // 페이지 변경 시 동작
                className={styles.pagination}
            /> */}
        </div>
    )
}