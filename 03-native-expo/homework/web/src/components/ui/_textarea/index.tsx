"use client";
import { PLACEHOLDER } from "@/components/place-new/constants";
import { css } from "@/styled-system/css";
import { useState } from "react";

export default function Textarea({ keyname }: { keyname: string }) {
    const [length, setLength] = useState(0);

    return (
        <div className={css_wrap}>
            <textarea
                className={css_text}
                placeholder={PLACEHOLDER[keyname]}
                onChange={(e) => setLength(e.target.value.length)}
            ></textarea>
            <span className={css_length}> {length} / 100 </span>
        </div>
    );
}

const css_wrap = css({
    display: "flex",
    flexDir: "column",
    position: "relative",
});

const css_text = css({
    w: "100%",
    h: "4.8rem",
    rounded: "0.8rem",
    border: "1px solid #d4d4d4",
    p: "0.8rem 1.6rem",
    fontSize: "1.2rem",

    pt: "1.6rem",
    minH: "16rem",
    resize: "none",
});

const css_length = css({
    position: "absolute",
    fontSize: "1.2rem",
    color: "#ababab",
    right: "1.6rem",
    bottom: "1.6rem",
});
