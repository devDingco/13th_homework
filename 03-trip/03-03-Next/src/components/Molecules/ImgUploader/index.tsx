"use client";
import Image from "next/image";
import add from "/public/svg/add.svg";
import { FigureStyle } from "@/commons/styles/styles";
import { useRef } from "react";

export default function ImgUploader({ imageUrl, onChange, idx }) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            <figure
                style={FigureStyle as React.CSSProperties}
                onClick={() => {
                    ref.current?.click();
                }}
            >
                {imageUrl ? (
                    <Image
                        src={`https://storage.googleapis.com/${imageUrl}`}
                        alt="#yourImage"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <Image src={add} alt="upload your image" />
                )}
                <input
                    type="file"
                    onChange={onChange}
                    multiple
                    style={{ display: "none" }}
                    id={idx}
                    ref={ref}
                    accept="image/jpeg,image/png"
                />
                <figcaption>
                    {imageUrl ? "" : "클릭하여 사진 업로드"}
                </figcaption>
            </figure>
        </>
    );
}
