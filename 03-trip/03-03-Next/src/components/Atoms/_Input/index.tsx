"use client";

import { InputStyle, TextStyle } from "@/commons/styles/styles";
import { InputPlaceholder } from "@/commons/types/types";

export default function Input({ ...props }) {
    const { id, textarea, onChange, onClick, value } = props;

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
                />
            ) : (
                <textarea
                    style={{ ...InputStyle, ...TextStyle, resize: "none" }}
                    id={id}
                    placeholder={InputPlaceholder[id]}
                    onChange={onChange}
                    defaultValue={value}
                ></textarea>
            )}
        </>
    );
}
