"use client";

import { useState } from "react";
import useHooksCreate from "@/commons/hooks/useHooksCreate";
import { InputField } from "@/components/Molecules/_InputField";

import AddressField from "@/components/Molecules/_AddrField";
import ImgField from "@/components/Molecules/_ImgField";
import Btn from "@/components/Atoms/_Btn";
import { useRouter } from "next/navigation";

export default function BoardsNewUI() {
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const valid = author && password && title && content;

    const Router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        switch (id) {
            case "author__ID": {
                setAuthor(value);
                break;
            }
            case "password__ID": {
                setPassword(value);
                break;
            }
            case "title__ID": {
                setTitle(value);
                break;
            }
            case "content__ID": {
                setContent(value);
                break;
            }
        }
    };

    const onClickCreate = useHooksCreate({ author, password, title, content });

    return (
        <>
            <header>게시물 등록</header>
            <form>
                <InputField
                    fieldClass="field__author"
                    labelID="author__ID"
                    type="text"
                    innerText="작성자"
                    placeHolder="작성자 명을 입력해 주세요."
                    onChange={handleChange}
                    value={author}
                    required
                />
                <InputField
                    fieldClass="field__password"
                    labelID="password__ID"
                    type="password"
                    innerText="비밀번호"
                    placeHolder="비밀번호를 입력해 주세요."
                    onChange={handleChange}
                    value={password}
                    required
                />
                <hr />
                <InputField
                    fieldClass="field__title"
                    labelID="title__ID"
                    type="text"
                    innerText="제목"
                    placeHolder="제목을 입력해 주세요."
                    onChange={handleChange}
                    value={title}
                    required
                />
                <hr />
                <InputField
                    fieldClass="field__content"
                    labelID="content__ID"
                    type="text"
                    innerText="내용"
                    placeHolder="내용을 입력해 주세요."
                    textArea="textArea"
                    onChange={handleChange}
                    value={content}
                    required
                />
                <hr />
                <AddressField />
                <hr />
                <InputField
                    fieldClass="field__link"
                    labelID="link__ID"
                    type="text"
                    innerText="소셜 링크"
                    placeHolder="링크를 입력해 주세요."
                />
                <hr />
                <ImgField />

                <div className="field__btn">
                    <Btn
                        className="btn__cancel"
                        value="취소"
                        onClick={(e) => {
                            e.preventDefault();
                            Router.push(`/boards`);
                        }}
                    />
                    <Btn
                        className="btn__submit"
                        value="등록하기"
                        disabled={!valid}
                        onClick={onClickCreate}
                    />
                </div>
            </form>
        </>
    );
}
