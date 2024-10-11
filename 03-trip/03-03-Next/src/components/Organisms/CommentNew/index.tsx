"use client";

import { Rate } from "antd";

import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import Image from "next/image";
import chat from "/public/svg/chat.svg";

export default function CommentNewUI() {
    return (
        <div
            style={{
                width: "1000px",
                backgroundColor: "#f3f2f7",
                borderRadius: "8px",
                padding: "20px",
            }}
        >
            <div style={{ display: "flex", gap: "10px" }}>
                <Image src={chat} alt="chat" />
                <label>댓글</label>
            </div>

            <Rate />
            <br />
            <br />

            <div style={{ display: "flex", gap: "20px" }}>
                <InputField id="author_ID" required />
                <InputField id="password_ID" required />
            </div>
            <br />

            <textarea></textarea>
            <br />
            <br />

            <Button label="등록하기" />
        </div>
    );
}
