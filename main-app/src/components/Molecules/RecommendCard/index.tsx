"use client";

import { css } from "@/common/styled-system/css";
import dummy from "/public/img/ping.png";

import { TagOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function RecommendCardUI() {
    return (
        <>
            <div className={CSS_CardWrapper}>
                <div className={CSS_CardLabel}>
                    <TagOutlined />
                    132
                </div>
                <Image className={CSS_CardImg} src={dummy} alt="just dummy img" />
                <div className={CSS_dimmedBG}></div>
                <div className={CSS_CardImg}>
                    <div className={css({ ...CSS_CardText, fontSize: "2rem" })}>사랑의 하츄링 얍얍얍</div>
                    <div className={css(CSS_CardText)}>내용</div>
                    <div
                        className={css({
                            ...CSS_CardText,
                            justifyContent: "flex-end",
                            fontSize: "2rem",
                        })}
                    >
                        가격
                    </div>
                </div>
            </div>
        </>
    );
}

const CSS_CardWrapper = css({
    width: "50rem",
    height: "50rem",
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

    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",

    objectFit: "cover",
});

const CSS_CardText = css.raw({
    width: "100%",
    height: "4rem",
    color: "#fff",
    padding: "1rem 1.6rem",
    fontWeight: "700",

    display: "flex",
    alignItems: "center",
    filter: "drop-shadow(0 2px 2px #000)",
    // backgroundColor: "#22222222",
});
