"use client";

import { InputStyle, TextStyle } from "@/common/styles/styles";
import { InputPlaceholder } from "@/common/types/types";

export default function Input({ ...props }) {
    const { id, textarea, onChange, onClick, value, disabled } = props;

    return (
        <>
            {!textarea ? (
                <input
                    style={InputStyle}
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
                    style={{ ...InputStyle, ...TextStyle, resize: "none" }}
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
