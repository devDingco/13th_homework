"use client";

import { css } from "@/common/styled-system/css";

export default function Button({ ...props }) {
    const { label, onClick, disabled } = props;

    return (
        <>
            <button className={CSS_Button} onClick={onClick} disabled={disabled}>
                {label}
            </button>
        </>
    );
}

const CSS_Button = css({
    w: "80px",
    h: "40px",
    bg: "var(--mono-gray000)",
    border: "2px solid var(--mono-gray200)",
    rounded: "8px",
    cursor: "pointer",
    flexShrink: 0,
    _hover: {
        bg: "var(--chroma-pantone)",
        border: "1px solid var(--chroma-pantoneBG)",
        color: "var(--mono-gray050)",
    },
});
