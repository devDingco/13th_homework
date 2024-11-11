"use client";

import { css, Styles } from "@/common/styled-system/css";
import { FieldValues, useFormContext } from "react-hook-form";

interface I_props {
    label: string;
    variant?: Styles;
    size?: Styles;
}

function BaseButton<Generic extends FieldValues>({ label, variant, size }: I_props) {
    const { formState } = useFormContext<Generic>();

    return (
        <button className={css(BASE, variant, size)} disabled={!formState.isValid}>
            {label}
        </button>
    );
}

const BASE = css.raw({
    w: "12rem",
    h: "4rem",
    bg: "#fff",
    border: "2px solid #eee",
    p: "0.8rem 1.2rem",
    m: "0.8rem 0rem",
    cursor: "pointer",
    flexShrink: 0,
    _disabled: {
        bg: "#eee",
    },
});

export function Button_Radii_Primary<Generic extends FieldValues>(props: I_props) {
    const Radii_Primary = css.raw({
        rounded: "0.8rem",
        bg: "#ffbe98",
        border: "1px solid #ffdfcc",
    });

    return <BaseButton<Generic> variant={Radii_Primary} {...props} />;
}

export function Button_Radii_White<Generic extends FieldValues>(props: I_props) {
    const Radii_White = css.raw({
        rounded: "0.8rem",
        bg: "#fff",
    });

    return <BaseButton<Generic> variant={Radii_White} {...props} />;
}
