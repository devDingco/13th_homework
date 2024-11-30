import { css } from "@/styled-system/css";

interface type_button {
    label: string;
}

export default function Button({ label }: type_button) {
    return <button className={css_button}>{label}</button>;
}

const css_button = css({
    w: "100%",
    h: "4.8rem",
    bg: "#2974E5",
    rounded: "0.8rem",
    fontSize: "2rem",
    color: "#fff",
    mt: "2rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    _disabled: {
        bg: "#c7c7c7",
        color: "#f5f5f5",
    },

    _hover: {
        filter: "brightness(1.1)",
    },
});
