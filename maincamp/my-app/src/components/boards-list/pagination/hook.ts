"use client"

import { MouseEvent, useState } from "react"
import { IPageNationProps } from "./types";
import { useQuery } from "@apollo/client";
import { FetchBoardsCountDocument } from "@/commons/graphql/graphql";

export const useListPagination = (props: IPagiNationProps) => {
    const {data} = useQuery(FetchBoardsCountDocument);
    const [startPage, setStartPage] = useState(1);

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        props.refetch({ nowPage: Number(event.currentTarget.id)})
    };

    const onClickPrevPage = () => {
        if(startPage === 1) return;
        setStartPage(startPage - 1);
        props.refetch({ nowPage: startPage - 1});
    }

    const onClickNextPage = () => {
        if(startPage + 1 <= props.lastPage){
            setStartPage(startPage + 1);
            props.refetch({ nowPage: startPage + 1});
        }
    };

    return {
        data,
        startPage,
        setStartPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
    }
}