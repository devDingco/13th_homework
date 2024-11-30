import { css } from "@/styled-system/css";
import { Plus } from "lucide-react";

export default function ImageBox() {
    return (
        <div className={css_imageWrap}>
            {new Array(4).fill("images").map((el, idx) => (
                <div className={css_imageBox} key={`${el + idx + 1}`}>
                    <Plus size={20} />
                    사진 등록
                </div>
            ))}
        </div>
    );
}

const css_imageWrap = css({
    display: "flex",
    mt: "2.4rem",
    gap: "2rem",
    overflow: "scroll",
});

const css_imageBox = css({
    w: "10rem",
    h: "10rem",
    bg: "#f5f5f5",
    rounded: "0.8rem",
    color: "#767676",
    fontSize: "1.2rem",
    fontWeight: "600",

    display: "flex",
    flexDir: "column",
    flexShrink: "0",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.4rem",
});
