import { PLACEHOLDER } from "@/components/place-new/constants";
import { css } from "@/styled-system/css";

export default function Input({ keyname }: { keyname: string }) {
    return <input className={css_input} placeholder={PLACEHOLDER[keyname]} type="text" />;
}

const css_input = css({
    w: "100%",
    h: "4.8rem",
    rounded: "0.8rem",
    border: "1px solid #d4d4d4",
    p: "0.8rem 1.6rem",
    fontSize: "1.2rem",
});
