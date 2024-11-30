import { LABEL } from "@/components/place-new/constants";
import { css } from "@/styled-system/css";

import Input from "@/components/ui/_input";
import Textarea from "@/components/ui/_textarea";

interface type_inputBox {
    keyname: string;
    required?: boolean;
    textarea?: boolean;
}

export default function InputBox({ keyname, required, textarea }: type_inputBox) {
    return (
        <label className={css_label}>
            {LABEL[keyname]} {required && <b>*</b>}
            {!textarea ? <Input keyname={keyname} /> : <Textarea keyname={keyname} />}
        </label>
    );
}

const css_label = css({
    display: "flex",
    flexDir: "column",
    gap: "0.8rem",
});
