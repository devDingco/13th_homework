"use client";

import { css } from "@/common/styled-system/css";
import { InputPlaceholder } from "@/common/types/types";

export default function Input({ ...props }) {
    const { id, textarea, onChange, onClick, value, disabled } = props;

    return (
        <>
            {!textarea ? (
                <input
                    className={css(CSS_Input)}
                    id={id}
                    type={id === "password_ID" ? "password" : "text"}
                    placeholder={InputPlaceholder[id]}
                    onChange={onChange}
                    onClick={onClick}
                    defaultValue={value}
                    disabled={disabled}
                />
            ) : (
                <textarea
                    className={css(CSS_Input, CSS_Text)}
                    id={id}
                    placeholder={InputPlaceholder[id]}
                    onChange={onChange}
                    defaultValue={value}
                    disabled={disabled}
                ></textarea>
            )}
        </>
    );
}

const CSS_Input = css.raw({
    w: "100%",
    h: "40px",
    p: "10px",
    bg: "var(--mono-gray000)",
    border: "2px solid var(--mono-gray200)",
    rounded: "8px",
    m: "8px 0px",
    display: "block",
});

const CSS_Text = css.raw({
    minHeight: "10rem",
    overflow: "auto",
    paddingTop: "1.2rem",
    lineHeight: "2.4rem",
    resize: "none",
});
