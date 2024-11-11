"use client"

import BoardsList from "@/components/boards-list/list"
import styles from "./css/styles.module.css"
import { useQuery } from "@apollo/client"
import { FetchBoardsCountDocument, FetchBoardsDocument } from "@/commons/graphql/graphql"
import ListPagination from "@/components/boards-list/pagination"
import { useEffect, useState } from "react"
import { FETCH_BOARDS } from "@/components/boards-list/list/queries"
import BoardListSearchPage from "@/components/boards-list/search"
import { FETCH_BOARDS_COUNT } from "@/components/boards-list/pagination/queries"

export default function BoardsListPage() {
    const [page, setPage] = useState<number>(1);
    
    const { data, refetch } = useQuery(FETCH_BOARDS, {
        variables: { mypage: page, pageSize: 10 }, // 페이지와 페이지 크기를 전달
        // fetchPolicy: "network-only", // 매번 서버에서 데이터를 가져오도록 설정
    });
    const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
    
    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 0) / 10);
    
    useEffect(() => {
        console.log("현재 페이지:", page);
    }, [page]);
    useEffect(() => {
        if(data){
            console.log("가져온 데이터:", data);
        }
    }, [data]);



    const handlePageChange = (newPage: number) => {
        console.log("이전페이지: ", page);
        setPage(newPage);
        console.log("새페이지: ", newPage);
        refetch({ mypage: newPage, pageSize: 10 }); // 새로운 페이지로 refetch
    };

    return(
        <>
            <div>
                <BoardListSearchPage />
            </div>
            <div className={styles.boardWrap}>
                <BoardsList data={data} page={page} refetch={refetch} />
                <ListPagination 
                    page={page} 
                    setPage={handlePageChange} 
                    total={dataBoardsCount?.fetchBoardsCount ?? 0} 
                    data={data}
                    refetch={refetch}
                    lastPage={lastPage}/>
            </div>
        </>
    )
}