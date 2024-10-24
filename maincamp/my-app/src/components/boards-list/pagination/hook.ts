"use client"

import { MouseEvent, useState } from "react"
import { IPagiNationProps } from "./types";
import { useQuery } from "@apollo/client";
import { FetchBoardsCountDocument } from "@/commons/graphql/graphql";

export const useListPagination = (props: IPagiNationProps) => {
    const {data} = useQuery(FetchBoardsCountDocument);
    const [startPage, setStartPage] = useState(1);

    const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
        const selectedPage = Number(event.currentTarget.id);
        setStartPage(selectedPage);
        props.refetch({ nowPage: selectedPage });
    };

    const onClickPrevPage = () => {
        if(startPage === 1) return;
        const newPage = startPage - 1;
        setStartPage(newPage);
        props.refetch({ nowPage: newPage });
    }

    const onClickNextPage = () => {
        if(startPage + 1 <= props.lastPage){
            const newPage = startPage + 1;
            setStartPage(newPage)
            props.refetch({ nowPage: newPage });
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