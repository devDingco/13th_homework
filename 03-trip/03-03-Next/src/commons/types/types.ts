import { Dispatch, SetStateAction } from "react";
import { FetchBoardsCountQuery, FetchBoardsQuery } from "../graphql/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Address } from "react-daum-postcode";

export interface IBoardInput {
    [index: string]: string | undefined;
    author_ID?: string;
    password_ID?: string;
    title_ID?: string;
    content_ID?: string;

    link_ID?: string;
    zipcode_ID?: string;
    address00_ID?: string;
    address01_ID?: string;
}

export const InputData = {
    author_ID: "작성자",
    password_ID: "비밀번호",
    title_ID: "제목",
    content_ID: "내용",

    link_ID: "링크",
    email_ID: "이메일",
    name_ID: "이름",
    passwordConfirm_ID: "비밀번호 확인",
};

export const InputPlaceholder = {
    author_ID: "작성자 명을 입력해 주세요.",
    password_ID: "비밀번호를 입력해 주세요.",
    title_ID: "제목을 입력해 주세요.",
    content_ID: "내용을 입력해 주세요.",

    link_ID: "링크를 입력해 주세요.",
    zipcode_ID: "01234",
    address_ID: "주소를 검색해 주세요.",
    addressDetail_ID: "상세주소를 입력해 주세요.",

    search_ID: "검색어를 입력해 주세요.",
    email_ID: "이메일을 입력해 주세요.",
    name_ID: "이름을 입력해 주세요.",
    passwordConfirm_ID: "비밀번호를 한 번 더 입력해 주세요.",
};

export interface ISearchProps {
    refetch?: (
        variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
    keyword?: string;
    setKeyword?: Dispatch<SetStateAction<string>>;
}

export interface IBoardListProps {
    data: FetchBoardsQuery | undefined;
    count: FetchBoardsCountQuery | undefined;
    current: number;
    keyword: string;
}

export interface IPagination {
    refetch: (
        variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
    lastPage: number;
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
}

export interface IBoardArgs {
    addressData: Address | undefined;
    imageUrl: string[];
}
