"use client"

import { FetchBoardSearchDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { ChangeEvent, useState } from "react"

export default function useListSearch(){

    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");

    const {data, refetch} = useQuery(FetchBoardSearchDocument);

    const getDebounce = _.debounce((value) => {
        refetch({mysearch: value, mypage: 1});
        setKeyword(value);
    }, 500);

    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        getDebounce(event?.target.value);
    }

    const onClickSearch = () => {
        refetch({mysearch: search, mypage: 1});
    }

    return {
        data,
        keyword,
        onChangeSearch,
        onClickSearch,
    }
}