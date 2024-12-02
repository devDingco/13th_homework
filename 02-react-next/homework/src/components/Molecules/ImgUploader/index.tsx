"use client";
import Image from "next/image";
import add from "/public/svg/add.svg";
import { useRef } from "react";
import { css } from "@/common/styled-system/css";

export default function ImgUploader({ imageUrl, onChange, idx }) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            <figure
                className={CSS_Img}
                onClick={() => {
                    ref.current?.click();
                }}
            >
                {imageUrl === "" ? (
                    <Image src={add} alt="upload your image" />
                ) : (
                    <Image
                        src={`https://storage.googleapis.com/${imageUrl}`}
                        alt="#yourImage"
                        width={120}
                        height={120}
                        className={css({ objectFit: "cover", overflow: "clip" })}
                    />
                )}
                <input
                    type="file"
                    onChange={onChange}
                    multiple
                    className={css({ display: "none" })}
                    id={idx}
                    ref={ref}
                    accept="image/jpeg,image/png"
                />
                <figcaption>{imageUrl ? "" : "클릭하여 사진 업로드"}</figcaption>
            </figure>
        </>
    );
}

const CSS_Img = css({
    width: "12rem",
    height: "12rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0.8rem",
    gap: "0.8rem",
    backgroundColor: "#eee",
    borderRadius: "0.8rem",
    cursor: "pointer",
});
