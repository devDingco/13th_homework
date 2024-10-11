export interface IHooksCreateProps {
    author: string;
    password: string;
    title: string;
    content: string;
}

export const InputData = {
    author_ID: "작성자",
    password_ID: "비밀번호",
    title_ID: "제목",
    content_ID: "내용",
    link_ID: "링크",
};

export const InputPlaceholder = {
    author_ID: "작성자 명을 입력해 주세요.",
    password_ID: "비밀번호를 입력해 주세요.",
    title_ID: "제목을 입력해 주세요.",
    content_ID: "내용을 입력해 주세요.",
    link_ID: "링크를 입력해 주세요.",
};
