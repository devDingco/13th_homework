"use client";

import Button from "@/components/Atoms/_Button";
import Input from "@/components/Atoms/_Input";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const UtilBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100rem",
    marginTop: "4rem",
};

const SearchWrapperStyle = {
    display: "flex",
    width: "40rem",
    alignItems: "center",
    gap: "2rem",
};

export default function SearchUI({ refetch, keyword, setKeyword }) {
    const Router = useRouter();

    const getDebounce = _.debounce((value) => {
        setKeyword(value);
    }, 300);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        getDebounce(e.target.value);
    };

    const onClickSearch = () => {
        refetch({ search: keyword, page: 1 });
    };

    return (
        <div style={UtilBarStyle}>
            <div style={SearchWrapperStyle}>
                <Input id="search_ID" onChange={onChangeSearch} />
                <Button label="검색하기" onClick={onClickSearch} />
            </div>
            <Button
                label="등록하기"
                onClick={() => Router.push(`/boards/new`)}
            />
        </div>
    );
}
