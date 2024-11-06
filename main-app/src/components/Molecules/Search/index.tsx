"use client";

import Button from "@/components/Atoms/_Button";
import Input from "@/components/Atoms/_Input";

import _ from "lodash";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { ISearchProps } from "@/common/types/types";

// import { DatePicker, Space } from "antd";
import { css } from "@/common/styled-system/css";
// const { RangePicker } = DatePicker;

export default function SearchUI(props: ISearchProps) {
    const { refetch, keyword, setKeyword } = props;

    const Router = useRouter();

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    const getDebounce = _.debounce((value) => {
        setKeyword(value);
    }, 300);

    const onClickSearch = () => {
        refetch({ search: keyword, page: 1 });
    };

    return (
        <div className={CSS_UtilBar}>
            <div className={CSS_SearchBar}>
                <div className={css({ w: "46rem" })}>
                    {/* <Space direction="vertical">
                        <RangePicker />
                    </Space> */}
                </div>
                <Input id="search_ID" onChange={onChangeSearch} />
                <Button label="검색하기" onClick={onClickSearch} />
            </div>
            <Button label="등록하기" onClick={() => Router.push(`/boards/new`)} />
        </div>
    );
}

const CSS_UtilBar = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "110rem",
    marginTop: "2rem",
});

const CSS_SearchBar = css({
    display: "flex",
    width: "86rem",
    alignItems: "center",
    gap: "2rem",
});
