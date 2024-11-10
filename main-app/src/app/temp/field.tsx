"use client";

import { css, Styles } from "@/common/styled-system/css";
import { LABEL } from "./constants";
import { Input_Radii_Full } from "./input";
import { FieldValues, Path } from "react-hook-form";

interface I_props<schema> {
    keyname: Path<schema>;
    formState: any;
    size?: Styles;
    required?: boolean;
    textarea?: boolean;
}

export default function InputField<Generic extends FieldValues>({
    keyname,
    formState,
    size,
    required,
    textarea,
}: I_props<Generic>) {
    return (
        <label>
            {LABEL[keyname]} <b className={css({ color: "#f55" })}>{required && "*"}</b>
            <Input_Radii_Full<Generic> keyname={keyname} size={size} textarea={textarea} />
            <strong className={css({ color: "#f55", display: "block" })}>{formState.errors[keyname]?.message}</strong>
        </label>
    );
}
