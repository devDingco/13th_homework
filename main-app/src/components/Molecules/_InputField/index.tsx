"use client";

import { css } from "@/common/styled-system/css";
import { InputData } from "@/common/types/types";
import Input from "@/components/Atoms/_Input";

export default function InputField({ ...props }) {
    const { id, value, required, textarea, onChange } = props;

    return (
        <>
            <label className={CSS_InputField}>
                {InputData[id]}
                <strong className={CSS_Error}>{required && " * "}</strong>

                <div>
                    <Input id={id} textarea={textarea} onChange={onChange} />
                </div>

                <strong className={CSS_Error}>{value || !required ? "" : "필수 입력 사항입니다."}</strong>
            </label>
        </>
    );
}

const CSS_InputField = css({
    display: "flex",
    flexDir: "column",
});

const CSS_Error = css({
    color: "var(--chroma-error)",
    display: "contents",
});
