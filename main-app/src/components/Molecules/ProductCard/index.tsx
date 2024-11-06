"use client";

import { css } from "@/common/styled-system/css";
import dummy from "/public/img/ping.png";

import Image from "next/image";
import { TagIcon } from "lucide-react";
import { Avatar } from "@ark-ui/react/avatar";

export default function ProductCardUI() {
    return (
        <div className={css({ w: "22rem" })}>
            <div className={CSS_CardWrapper}>
                <div className={CSS_CardLabel}>
                    <TagIcon size={20} />
                    132
                </div>
                <div className={CSS_dimmedBG}></div>
                <Image className={CSS_CardImg} src={dummy} alt="just dummy img" />
            </div>

            <div className={CSS_Item}>
                <div className={css({ fontSize: "2rem" })}>사랑의 하츄핑 얍얍얍</div>
                <div>처음 본 순간, 한눈에 반해버렸어! 설레는 운명이 시작된 우리의 첫 만남!</div>
                <div>#하츄핑 #핑핑 #전체 관람가</div>

                <div className={CSS_Profile}>
                    <div className={CSS_Avatar}>
                        <Avatar.Root
                            className={css({
                                width: "4rem",
                                height: "4rem",
                                clipPath: "circle(50%)",
                            })}
                        >
                            <Avatar.Fallback>(프사)</Avatar.Fallback>
                            <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
                        </Avatar.Root>
                        빈얀트리
                    </div>
                    <div>32,900원</div>
                </div>
            </div>
        </div>
    );
}

const CSS_Item = css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
});

const CSS_Profile = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const CSS_Avatar = css({
    display: "flex",
    alignItems: "center",
    gap: "4px",
});

const CSS_CardWrapper = css({
    width: "22rem",
    height: "20rem",
    backgroundColor: "#f2f3f7",
    borderRadius: "2rem",
    position: "relative",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});
const CSS_CardLabel = css({
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
});

const CSS_dimmedBG = css({
    w: "100%",
    h: "100%",
    bg: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.0) 70%)",
    pos: "absolute",
    z: "1",
    rounded: "1.6rem",
});

const CSS_CardImg = css({
    width: "90%",
    height: "90%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",

    objectFit: "cover",
});
