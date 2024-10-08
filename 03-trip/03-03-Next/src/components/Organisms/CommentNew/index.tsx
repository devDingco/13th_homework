"use client";

import Btn from "@/components/Atoms/_Btn";
import InputField from "@/components/Molecules/_InputField";
import Image from "next/image";

import chat from "/public/svg/chat.svg";
import StarBox from "@/components/Molecules/_StarBox";

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

            <div style={{ display: "flex" }}>
                <StarBox />
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
                <InputField
                    innerText="작성자"
                    placeholder="작성자 명을 입력해 주세요."
                    required
                />
                <InputField
                    innerText="비밀번호"
                    placeholder="비밀번호를 입력해 주세요."
                    required
                />
            </div>
            <textarea></textarea>

            <Btn value="등록하기" />
        </div>
    );
}
