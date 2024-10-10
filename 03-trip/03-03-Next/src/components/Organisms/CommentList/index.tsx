"use client";

import { Rate } from "antd";

import Image from "next/image";

import profile from "/public/svg/person.svg";
import edit from "/public/svg/edit.svg";
import close from "/public/svg/close.svg";

export default function CommentListUI() {
    const comment = `
살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라
    `;

    return (
        <>
            <div
                style={{
                    width: "1000px",
                    backgroundColor: "#f3f2f7",
                    borderRadius: "8px",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Image src={profile} alt="profile" />
                        <div>writer</div>
                        <Rate disabled defaultValue={2} />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Image src={edit} alt="edit" />
                        <Image src={close} alt="close" />
                    </div>
                </div>

                <pre style={{ margin: "0", padding: "0" }}>{comment}</pre>

                <div>2024.11.11</div>
            </div>
        </>
    );
}
