import { css } from "@/styled-system/css";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function PlaceNewPage() {
    return (
        <>
            <header className={css_header}>
                <div className={css_headIcon}>
                    <ChevronLeft />
                </div>
                <div className={css_headTitle}>플레이스 등록</div>
            </header>

            <section className={css_section}>
                <div className={css_imageBox}>
                    <Plus size={20} />
                    사진 등록
                </div>

                <label className={css_label}>
                    플레이스 이름 <b>*</b>
                    <input
                        className={css(css_input)}
                        placeholder="플레이스 이름을 입력해 주세요. (1글자 이상)"
                    />
                </label>

                <label className={css_label}>
                    플레이스 주소 <b>*</b>
                    <input className={css(css_input, css_black)} placeholder="플레이스 주소 입력" />
                </label>

                <label className={css_label}>
                    플레이스 내용 <b>*</b>
                    <textarea
                        className={css(css_input, css_text)}
                        placeholder="플레이스 내용을 입력해 주세요. (1글자 이상)"
                    ></textarea>
                </label>

                <button className={css_button}>로그 등록</button>
            </section>
        </>
    );
}

const css_header = css({
    w: "100%",
    h: "4.8rem",

    display: "flex",
    alignItems: "center",
});

const css_headIcon = css({
    w: "4rem",
    h: "4rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const css_headTitle = css({
    fontSize: "2rem",
    fontWeight: "600",
});

const css_section = css({
    w: "100%",
    h: "100%",

    display: "flex",
    flexDir: "column",
    justifyContent: "flex-start",
    gap: "2rem",
});

const css_imageBox = css({
    w: "10rem",
    h: "10rem",
    bg: "#f5f5f5",
    rounded: "0.8rem",
    color: "#767676",
    fontSize: "1.2rem",
    fontWeight: "600",
    mt: "2.4rem",

    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.4rem",
});

const css_label = css({
    display: "flex",
    flexDir: "column",
    gap: "0.8rem",
    fontWeight: "400",
});

const css_input = css.raw({
    w: "100%",
    h: "4.8rem",
    rounded: "0.8rem",
    border: "1px solid #d4d4d4",
    p: "0.8rem 1.6rem",
});

const css_black = css.raw({
    border: "1px solid #222",
    _placeholder: {
        color: "#222",
        fontWeight: "600",
    },
});

const css_text = css.raw({
    minH: "18rem",
    resize: "none",
});

const css_button = css({
    w: "100%",
    h: "4.8rem",
    bg: "#c7c7c7",
    fontSize: "2rem",
    rounded: "0.8rem",
    color: "#f5f5f5",
    mt: "2rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
