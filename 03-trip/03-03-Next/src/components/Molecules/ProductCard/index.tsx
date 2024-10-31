"use client";

import dummy from "/public/img/ping.png";

import { TagOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { CSSProperties } from "react";

export default function ProductCardUI() {
    return (
        <div style={CSSWrapper}>
            <div style={CSSCardWrapper}>
                <div style={CSSCardLabel}>
                    <TagOutlined />
                    132
                </div>
                <div style={CSSCardImg}></div>
            </div>

            <div style={CSSItem}>
                <div style={CSSText}>사랑의 하츄핑 얍얍얍</div>
                <div>
                    처음 본 순간, 한눈에 반해버렸어! 설레는 운명이 시작된 우리의
                    첫 만남!
                </div>
                <div>#하츄핑 #핑핑 #전체 관람가</div>

                <div style={CSSProfile}>
                    <div style={CSSAvatar}>
                        <Avatar />
                        빈얀트리
                    </div>
                    <div>32,900원</div>
                </div>
            </div>
        </div>
    );
}

const CSSWrapper: CSSProperties = {
    width: "22rem",
};

const CSSText: CSSProperties = {
    fontSize: "2rem",
};

const CSSItem: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const CSSProfile: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const CSSAvatar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
};

const CSSCardWrapper: CSSProperties = {
    width: "22rem",
    height: "20rem",
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
    top: "1rem",
    right: "1rem",
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
