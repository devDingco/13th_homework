"use client";

import { css } from "@/common/styled-system/css";
import ImgUploader from "../ImgUploader";

export default function ImgField({ imageUrl, onChange }) {
    return (
        <>
            <label>사진 첨부</label>
            <div className={CSS_ImgWrap}>
                {imageUrl.map((el, idx) => (
                    <ImgUploader key={idx} idx={idx} imageUrl={el} onChange={onChange} />
                ))}
            </div>
        </>
    );
}

const CSS_ImgWrap = css({
    display: "flex",
    gap: "2rem",
    overflow: "clip",
});
