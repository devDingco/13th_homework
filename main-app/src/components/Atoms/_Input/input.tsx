"use client";

import { PLACEHOLDER } from "@/common/constants/constants";
import { css, Styles } from "@/common/styled-system/css";
import { FieldValues, Path, useFormContext } from "react-hook-form";

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

/**
 * @param keyname 인풋의 라벨에 해당하는 이름을 써주세요.
 * @param size 인라인 스타일을 객체로 넘겨주면 알아서 판다css로 전환 됩니다.
 * @param required 필수값일 경우 작성
 * @param textarea 프롭으로 이거 내려주면 알아서 textarea로 뜹니다.
 */
export function Input_Radii_Full<Generic extends FieldValues>(props: I_props<Generic>) {
    const Radii_Full = css.raw({
        rounded: "0.8rem",
        w: "100%",
    });

    return <BaseInput<Generic> variant={Radii_Full} {...props} />;
}
