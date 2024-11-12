"use client"
import { DatePicker } from "antd"
import styles from "./styles.module.css"
import { ChangeEvent, useState } from "react"
import { useQuery } from "@apollo/client";
import { FetchBoardSearchDocument } from "@/commons/graphql/graphql";
import _ from "lodash";
import useListSearch from "./hook";

export default function BoardListSearchPage(){
    const { data, 
            keyword,
            onChangeSearch,
            onClickSearch,
        } = useListSearch();

    // const [keyword, setKeyword] = useState("");
    // const [search, setSearch] = useState("");
    // const {data, refetch} = useQuery(FetchBoardSearchDocument);

    // const onClickSearch = () => {
    //     refetch({ mysearch: search, mypage: 1});
    // }

    // const getDebounce = _.debounce((value) => {
    //     refetch({mysearch: value, mypage: 1});
    //     setKeyword(value);
    // }, 500);
    // const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSearch(event.currentTarget.value);
    // }

    return(
        <div className={styles.searchWrap}>
            <h1 className={styles.fontSize}>트립토크 게시판</h1>
            <div className={styles.searchBar}>
                <div>
                    <DatePicker></DatePicker>
                </div>
                <div className={styles.searchBarInput}>
                    <input 
                        type="text" 
                        placeholder="제목을 검색해주세요."
                        onChange={onChangeSearch}
                    />
                </div>
                <button onClick={onClickSearch} className={styles.searchBtn}>검색</button>
                <button className={styles.tripBtn}>트립토크 등록</button>
            </div>
        </div>
    )
}