"use client";

import { Rate } from "antd";
import { useState } from "react";

import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import Image from "next/image";
import chat from "/public/svg/chat.svg";

import {
    comment_input,
    comment_label,
    comment_wrap,
} from "@/commons/styles/commentStyles";

import useCommentNew from "@/commons/hooks/useCommentNew";

export default function CommentNewUI() {
    const [stars, setStars] = useState(0);

    const { changeCommentData, createCommentNew } = useCommentNew(stars);

    return (
        <section style={comment_wrap}>
            <div style={comment_label}>
                <Image src={chat} alt="chat" />
                <label>댓글</label>
            </div>

            <Rate value={stars} onChange={setStars} allowHalf />

            <div style={{ ...comment_input, width: "50rem" }}>
                <InputField id="author_ID" onChange={changeCommentData} />
                <InputField id="password_ID" onChange={changeCommentData} />
            </div>

            <div>
                <InputField
                    id="content_ID"
                    onChange={changeCommentData}
                    textarea
                />
            </div>

            <Button label="등록하기" onClick={createCommentNew} />
        </section>
    );
}
