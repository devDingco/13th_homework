"use client"

import { MouseEvent, useState } from "react"
import { IPaginationProps } from "./types";

export const useListPagination = (props: IPaginationProps) => {
    const [startPage, setStartPage] = useState(1);

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        const selectedPage = Number(event?.currentTarget.id);
        props.setPage(selectedPage); // 페이지 상태 업데이트
        props.refetch({ mypage: selectedPage, pageSize: 10 }); // pageSize 추가
        console.log("페이지클릭", selectedPage);
    };

    const onClickPrevPage = () => {
        if(startPage === 1) return;
        const newPage = startPage - 10;
        setStartPage(newPage);
        props.setPage(newPage); // 페이지 상태 업데이트
        props.refetch({mypage: newPage, pageSize: 10}); // pageSize 추가
    }

    const onClickNextPage = () => {
        if(startPage + 10 <= props.lastPage){
            const newPage = startPage + 10;
            setStartPage(newPage);
            props.setPage(newPage); // 페이지 상태 업데이트
            props.refetch({mypage: newPage, pageSize: 10}); // pageSize 추가
        }
    };

    // const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    //     props.refetch({ mypage: Number(event.currentTarget.id) });
    //     console.log("페이지클릭");
    // };
    
    // const onClickPrevPage = () => {
    //     if(startPage === 1) return;
    //     setStartPage(startPage - 10);
    //     props.refetch({ mypage: startPage - 10 });
    // }
    
    // const onClickNextPage = () => {
    //     if(startPage + 10 <= props.lastPage){
    //         setStartPage(startPage + 10)
    //         console.log(setStartPage);
    //         props.refetch({ mypage: startPage + 10 });
    //     }
    // };

    return {
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
    }
}