import { LABEL } from "@/components/place-new/constants";
import { css } from "@/styled-system/css";

import Input from "@/components/ui/_input";
import Textarea from "@/components/ui/_textarea";
import { useFormContext } from "react-hook-form";

interface type_inputBox {
    keyname: string;
    required?: boolean;
    textarea?: boolean;
}

export default function InputBox({ keyname, required, textarea }: type_inputBox) {
    const {
        formState: { errors },
    } = useFormContext();

    const error = errors[keyname]?.message;

    return (
        <label className={css_label}>
            {LABEL[keyname]} {required && <b>*</b>}
            {!textarea ? <Input keyname={keyname} /> : <Textarea keyname={keyname} />}
            {typeof error === "string" && <b>{error}</b>}
        </label>
    );
}

const css_label = css({
    display: "flex",
    flexDir: "column",
    gap: "0.8rem",
});
