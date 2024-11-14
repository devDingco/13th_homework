"use client";

import { I_schema } from "@/app/auth/schema";
import { css, Styles } from "@/common/styled-system/css";
import { useFormContext } from "react-hook-form";

interface I_props {
    label: string;
    variant?: Styles;
    size?: Styles;
    type?: "button" | "submit";
    onClick?: () => void;
}

function BaseButton({ label, variant, size, type, onClick }: I_props) {
    const {
        formState: { isValid },
    } = useFormContext<I_schema>();

    return (
        <button
            className={css(BASE, variant, size)}
            type={type}
            onClick={onClick}
            disabled={type === "button" ? false : !isValid}
        >
            {label}
        </button>
    );
}

const BASE = css.raw({
    w: "10rem",
    h: "4rem",
    bg: "#fff",
    border: "1px solid #eee",
    p: "0.8rem 1.2rem",
    m: "0.8rem 0rem",
    cursor: "pointer",
    flexShrink: 0,
    _hover: {
        bg: "#eee",
    },
    _disabled: {
        bg: "#eee",
    },
});

/**
 * @param label 버튼이름을 문자열로 써주세요.
 * @param size 인라인 스타일을 객체로 넘겨주면 알아서 판다css로 전환 됩니다.
 * @param type 폼 안에서 쓰면 안달아도 되고 버튼 따로 쓸거면 button type 물려주기.
 * @param onClick ()=>void로 해둬서 return받으면 에러뜹니다.
 */
export function Button_Radii_Primary(props: I_props) {
    const Radii_Primary = css.raw({
        rounded: "0.8rem",
        bg: "#ffbe98",
        border: "1px solid #ffdfcc",
    });

    return <BaseButton variant={Radii_Primary} {...props} />;
}

/**
 * @param label 버튼이름을 문자열로 써주세요.
 * @param size 인라인 스타일을 객체로 넘겨주면 알아서 판다css로 전환 됩니다.
 * @param type 폼 안에서 쓰면 안달아도 되고 버튼 따로 쓸거면 button type 물려주기.
 * @param onClick ()=>void로 해둬서 return받으면 에러뜹니다.
 */
export function Button_Radii_White(props: I_props) {
    const Radii_White = css.raw({
        rounded: "0.8rem",
        bg: "#fff",
    });

    return <BaseButton variant={Radii_White} {...props} />;
}
