"use client";

import { InputData } from "@/commons/types/types";
import Input from "@/components/Atoms/_Input";

export default function InputField({ ...props }) {
    const { id, value, required, textarea, onChange } = props;

    return (
        <label style={{ display: "flex", flexDirection: "column" }}>
            {InputData[id]}
            <strong style={{ color: "#F55", display: "contents" }}>
                {required && " * "}
            </strong>

            <div>
                <Input id={id} textarea={textarea} onChange={onChange} />
            </div>

            <strong style={{ color: "#F55", marginBottom: "20px" }}>
                {value || !required ? <br /> : "필수 입력 사항입니다."}
            </strong>
        </label>
    );
}
