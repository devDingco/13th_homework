import { css } from "@/styled-system/css";
import { ChevronRight } from "lucide-react";

export default function AddressBox() {
    return (
        <div className={css_addressWrap}>
            <div>플레이스 주소</div>

            <button className={css_addressBox} type="button">
                플레이스 주소 입력 <ChevronRight />
            </button>
        </div>
    );
}

const css_addressWrap = css({
    display: "flex",
    flexDir: "column",
    gap: "0.8rem",
});

const css_addressBox = css({
    w: "100%",
    h: "4.8rem",
    rounded: "0.8rem",
    border: "1px solid #222",
    p: "0.8rem 1.6rem",
    fontSize: "1.2rem",
    fontWeight: "600",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});
