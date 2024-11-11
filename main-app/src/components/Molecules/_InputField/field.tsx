"use client";

import { LABEL } from "@/common/constants/constants";
import { css, Styles } from "@/common/styled-system/css";
import { Input_Radii_Full } from "@/components/Atoms/_Input/input";
import { FieldValues, Path } from "react-hook-form";

interface I_props<schema> {
    keyname: Path<schema>;
    formState: any;
    size?: Styles;
    required?: boolean;
    textarea?: boolean;
}

/**
 * @param keyname 인풋의 라벨에 해당하는 이름을 써주세요.
 * @param size 인라인 스타일을 객체로 넘겨주면 알아서 판다css로 전환 됩니다.
 * @param formState useForm의 methods.formState를 props로 내려주세요. 에러검증에 사용합니다.
 * @param required 필수값일 경우 작성
 * @param textarea 프롭으로 이거 내려주면 알아서 textarea로 뜹니다.
 */
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
