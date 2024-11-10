"use client";

import { css, Styles } from "@/common/styled-system/css";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { PLACEHOLDER } from "./constants";

interface I_props<schema> {
    keyname: Path<schema>;
    variant?: Styles;
    size?: Styles;
    textarea?: boolean;
}

function BaseInput<Generic extends FieldValues>({ keyname, variant, size, textarea }: I_props<Generic>) {
    const { register } = useFormContext<Generic>();

    return (
        <>
            {!textarea ? (
                <input
                    className={css(BASE, variant, size)}
                    placeholder={PLACEHOLDER[keyname]}
                    type={keyname === "password" || keyname === "pwConfirm" ? "password" : "text"}
                    {...register(keyname)}
                />
            ) : (
                <textarea
                    className={css(BASE, variant, size, TEXTAREA)}
                    placeholder={PLACEHOLDER[keyname]}
                    {...register(keyname)}
                ></textarea>
            )}
        </>
    );
}

const BASE = css.raw({
    w: "48rem",
    h: "4rem",
    bg: "#fff",
    border: "2px solid #eee",
    p: "0.8rem 1.2rem",
    m: "0.8rem 0rem",
});

const TEXTAREA = css.raw({
    minH: "10rem",
    overflow: "auto",
    resize: "none",
});

export function Input_Radii_Full<Generic extends FieldValues>(props: I_props<Generic>) {
    const Radii_Full = css.raw({
        rounded: "0.8rem",
        w: "100%",
    });

    return <BaseInput<Generic> variant={Radii_Full} {...props} />;
}
