"use client";

import { Rate } from "antd";
import { useState } from "react";

import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import Image from "next/image";
import chat from "/public/svg/chat.svg";

import useCommentNew from "@/common/hooks/useCommentNew";
import { css } from "@/common/styled-system/css";

export default function CommentNewUI() {
    const [stars, setStars] = useState(0);

    const { changeCommentData, createCommentNew } = useCommentNew(stars);

    return (
        <section className={CSS_CommentBG}>
            <div className={CSS_CommentLabel}>
                <Image src={chat} alt="chat" />
                <label>댓글</label>
            </div>

            <Rate value={stars} onChange={setStars} allowHalf />

            <div className={CSS_CommentInput}>
                <InputField id="author_ID" onChange={changeCommentData} />
                <InputField id="password_ID" onChange={changeCommentData} />
            </div>

            <div>
                <InputField id="content_ID" onChange={changeCommentData} textarea />
            </div>

            <Button label="등록하기" onClick={createCommentNew} />
        </section>
    );
}

const CSS_CommentBG = css({
    backgroundColor: "#F2F3F7",
    borderRadius: "0.8rem",
    display: "flex",
    gap: "1rem",
    margin: "2rem 0rem",
});

const CSS_CommentLabel = css({
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    height: "4rem",
});

const CSS_CommentInput = css({
    display: "flex",
    justifyContent: "space-between",
    w: "50rem",
});
