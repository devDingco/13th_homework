"use client";

import Image from "next/image";
import add from "/public/svg/add.svg";
import { FigureStyle } from "@/commons/types/styles";

export default function ImgField() {
    return (
        <>
            <label>사진 첨부</label>
            <div style={{ display: "flex", gap: "8px" }}>
                <figure style={FigureStyle}>
                    <Image src={add} alt="alt" />
                    <figcaption>클릭하여 사진 업로드</figcaption>
                </figure>

                <figure style={FigureStyle}>
                    <Image src={add} alt="alt" />
                    <figcaption>클릭하여 사진 업로드</figcaption>
                </figure>

                <figure style={FigureStyle}>
                    <Image src={add} alt="alt" />
                    <figcaption>클릭하여 사진 업로드</figcaption>
                </figure>
            </div>
        </>
    );
}

{
    /* <aside>
    <div className="field__attach">
        <p>사진 첨부</p>

        <div className="attach__img">
            <figure>
                <img src="/svg/add.svg" alt="click to upload img" />
                <figcaption>클릭하여 사진 업로드</figcaption>
            </figure>

            <figure>
                <img src="/svg/add.svg" alt="click to upload img" />
                <figcaption>클릭하여 사진 업로드</figcaption>
            </figure>

            <figure>
                <img src="/svg/add.svg" alt="click to upload img" />
                <figcaption>클릭하여 사진 업로드</figcaption>
            </figure>
        </div>
    </div>
</aside> */
}
