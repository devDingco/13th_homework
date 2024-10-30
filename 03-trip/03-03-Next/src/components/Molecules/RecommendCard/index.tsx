"use client";

import dummy from "/public/img/ping.png";

import { TagOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

export default function RecommendCardUI() {
    return (
        <>
            <div style={CSSCardWrapper}>
                <div style={CSSCardLabel}>
                    <TagOutlined />
                    132
                </div>
                <div style={CSSCardImg}>
                    {/* <Image src={dummy} alt="just dummy img" /> */}
                    <div>
                        <div style={{ ...CSSCardText, fontSize: "2rem" }}>
                            사랑의 하츄링 얍얍얍
                        </div>
                        <div style={CSSCardText}>내용</div>
                        <div
                            style={{
                                ...CSSCardText,
                                justifyContent: "flex-end",
                                fontSize: "2rem",
                            }}
                        >
                            가격
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const CSSCardWrapper: CSSProperties = {
    width: "50rem",
    height: "50rem",
    backgroundColor: "#f2f3f7",
    borderRadius: "2rem",
    position: "relative",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    background:
        "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 100%)",
};
const CSSCardLabel: CSSProperties = {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    opacity: "0.5",

    width: "5.6rem",
    height: "3.2rem",
    backgroundColor: "#222",
    borderRadius: "1rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.4rem",
    color: "#eee",
    fontSize: "1.2rem",
};

const CSSCardImg: CSSProperties = {
    width: "90%",
    height: "90%",
    backgroundImage: `url("${dummy.src}")`,
    backgroundSize: "cover",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
};

const CSSCardText: CSSProperties = {
    width: "100%",
    height: "4rem",
    color: "#fff",
    padding: "1rem 1.6rem",
    fontWeight: "700",

    display: "flex",
    alignItems: "center",
    filter: "drop-shadow(0 2px 2px #000)",
    // backgroundColor: "#22222222",
};
