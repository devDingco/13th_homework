export interface ICreateProps {
    author: string;
    password: string;
    title: string;
    content: string;
}

export interface ISubmitInput {
    [index: string]: string | undefined;
    author_ID: string;
    password_ID: string;
    title_ID: string;
    content_ID: string;
    zipcode?: string;
    address01?: string;
    address02?: string;
    link_ID?: string | undefined;
}

export const InputData: ISubmitInput = {
    author_ID: "작성자",
    password_ID: "비밀번호",
    title_ID: "제목",
    content_ID: "내용",
    link_ID: "링크",
};

export const InputPlaceholder: ISubmitInput = {
    author_ID: "작성자 명을 입력해 주세요.",
    password_ID: "비밀번호를 입력해 주세요.",
    title_ID: "제목을 입력해 주세요.",
    content_ID: "내용을 입력해 주세요.",
    link_ID: "링크를 입력해 주세요.",
    zipcode_ID: "01234",
    address01_ID: "주소를 검색해 주세요.",
    address02_ID: "상세주소를 입력해 주세요.",
};
