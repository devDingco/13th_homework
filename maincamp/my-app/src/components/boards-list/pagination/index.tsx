"use client"

import {useListPagination} from "./hook"

import styles from "./styles.module.css"
import { Pagination, PaginationProps } from "antd"
import { useQuery } from "@apollo/client"
import { FetchBoardsCountDocument } from "@/commons/graphql/graphql"
import { IPaginationProps } from "./types"

export default function ListPagination(props:IPaginationProps){
    const { data } = useQuery(FetchBoardsCountDocument)

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
            {props?.data?.fetchBoards?.length && (
                <Pagination
                    // defaultCurrent={1}
                    // defaultPageSize={10}
                    // align="center"
                    // // current={props.page}
                    // // total={data?.fetchBoardsCount}
                    // showSizeChanger={false}
                    // onChange={(page) => console.log(page)} // 페이지 변경 시 동작
                    // className={styles.pagination}
                    // // refetch={refetch}
                    // // lastPage={lastPage}
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