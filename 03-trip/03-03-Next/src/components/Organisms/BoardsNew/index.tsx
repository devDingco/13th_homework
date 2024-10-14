"use client";

import useCreate from "@/commons/hooks/useCreate";
import useSubmitInput from "@/commons/hooks/useSubmitInput";

import Button from "@/components/Atoms/_Button";
import AddressField from "@/components/Molecules/_AddrField";
import ImgField from "@/components/Molecules/_ImgField";
import InputField from "@/components/Molecules/_InputField";

export default function BoardsNewUI() {
    const {
        handleChange,
        author,
        password,
        title,
        content,
        // youtube,
        // zipcode,
        // address01,
        // address02,
    } = useSubmitInput();
    const valid = author && password && title && content;

    const onClickCreate = useCreate({ author, password, title, content });

    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100rem",
            }}
        >
            <header>게시글 작성</header>

            <InputField
                id="author_ID"
                value={author}
                onChange={handleChange}
                required
            />
            <InputField
                id="password_ID"
                value={password}
                onChange={handleChange}
                required
            />
            <InputField
                id="title_ID"
                value={title}
                onChange={handleChange}
                required
            />
            <InputField
                id="content_ID"
                value={content}
                onChange={handleChange}
                required
                textarea
            />

            <AddressField onChange={handleChange} />

            <InputField id="link_ID" onChange={handleChange} />

            <ImgField />

            <Button
                label="등록하기"
                disabled={!valid}
                onClick={onClickCreate}
            />
        </form>
    );
}
