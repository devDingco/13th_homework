"use client";

import Image from "next/image";
import add from "/public/svg/add.svg";
import { FigureStyle } from "@/commons/styles/styles";

export default function ImgField() {
    return (
        <>
            <label>사진 첨부</label>
            <div style={{ display: "flex", gap: "10px" }}>
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
