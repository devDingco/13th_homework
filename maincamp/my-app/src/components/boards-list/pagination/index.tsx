"use client"

import {useListPagination} from "./hook"

import styles from "./styles.module.css"
import { Pagination, PaginationProps } from "antd"
import { useQuery } from "@apollo/client"
import { FetchBoardsCountDocument } from "@/commons/graphql/graphql"
import { IPaginationProps } from "./types"
import { FETCH_BOARDS } from "./queries"

export default function ListPagination(props:IPaginationProps){
    const { data } = useQuery(FetchBoardsCountDocument)
    const { onClickNextPage, onClickPage, onClickPrevPage, startPage } = useListPagination(props);

    const pageOnChange: PaginationProps["onChange"] = (page) => {
        props.setPage(page);
    };
    console.log("data?.fetchBoardsCount", data?.fetchBoardsCount);
    return(
        <div className={styles.paginationWrap}>
            {/* <span onClick={onClickPrevPage} className={styles.listPrev}>이전</span>
            {new Array(10).fill("페이지").map(
                (_, index) =>
                    index + startPage <= props.lastPage && (
                        <span
                            className={`${styles.paginationNumber} ${index + startPage === props.page ? styles.pageSelected : ''}`} // 선택된 페이지 스타일 적용
                            key={index + startPage}
                            id={String(index + startPage)}
                            onClick={onClickPage}
                        >
                            {index + startPage}
                        </span>
                    )
            )}
            <span onClick={onClickNextPage} className={styles.listNext}>다음</span> */}
            {props?.data?.fetchBoards?.length && (
                <Pagination
                    defaultPageSize={10}
                    onChange={pageOnChange}
                    align="center"
                    current={props.page}
                    total={data?.fetchBoardsCount}
                    showSizeChanger={false}
                />
            )}
        </div>
    )
}