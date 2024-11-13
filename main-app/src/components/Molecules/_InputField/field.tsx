"use client";

import { I_schema } from "@/app/auth/schema";
import { LABEL } from "@/common/constants/constants";
import { css, Styles } from "@/common/styled-system/css";
import { Input_Radii_Full } from "@/components/Atoms/_Input/input";
import { useFormContext } from "react-hook-form";

interface I_props {
    keyname: keyof I_schema;
    size?: Styles;
    required?: boolean;
    textarea?: boolean;
}

/**
 * @param keyname 인풋의 라벨에 해당하는 이름을 써주세요.
 * @param size 인라인 스타일을 객체로 넘겨주면 알아서 판다css로 전환 됩니다.
 * @param required 필수값일 경우 작성
 * @param textarea 프롭으로 이거 내려주면 알아서 textarea로 뜹니다.
 */
export default function Field({ keyname, size, required, textarea }: I_props) {
    const {
        formState: { errors },
    } = useFormContext<I_schema>();

    return (
        <label>
            {LABEL[keyname]} <b className={css(red)}>{required && "*"}</b>
            <Input_Radii_Full keyname={keyname} size={size} textarea={textarea} />
            <strong className={css(red, { display: "block" })}>{errors[keyname] && errors[keyname].message}</strong>
        </label>
    );
}

const red = css.raw({
    color: "#f55",
});
