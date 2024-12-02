"use client";
import { css } from "@/styled-system/css";
import { Plus, X } from "lucide-react";
import Image from "next/image";

import SweetAlert from "@/common/library/sweet-alert";
import { ChangeEvent, useRef, useState } from "react";

export default function ImageBox() {
    const { errorAlert } = SweetAlert();

    const [images, setImages] = useState<string[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);

    function UploadFile(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;

        const newImages: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // 파일 크기 제한 (5MB 초과시 업로드 불가)
            if (file.size > 5 * 1024 * 1024) {
                return errorAlert("5MB를 초과하는 이미지는 업로드 할 수 없습니다.");
            }

            // 파일 갯수 제한 (10장 초과시 업로드 불가)
            if (images.length + newImages.length >= 10) {
                return errorAlert("이미지는 최대 10장까지만 업로드 할 수 있습니다.");
            }

            // URL 생성하여 배열에 이미지 추가
            const url = URL.createObjectURL(file);
            newImages.push(url);
        }

        setImages((prev) => [...prev, ...newImages]);
    }

    function deleteImage(idx: number) {
        setImages((prev) => prev.filter((_, i) => i !== idx));
    }

    return (
        <div className={css_imageWrap}>
            <div className={css_imageBox} onClick={() => fileRef.current?.click()}>
                <Plus size={20} />
                사진 등록
            </div>
            <input
                type="file"
                multiple
                onChange={UploadFile}
                style={{ display: "none" }}
                ref={fileRef}
                accept="image/jpeg,image/png"
            />

            {images.map((url, idx) => (
                <div className={css_imageBox} key={url}>
                    <Image src={url} alt="image" width={0} height={0} className={css_imageModify} />
                    <button
                        className={css_deleteButton}
                        type="button"
                        onClick={() => deleteImage(idx)}
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}

const css_imageWrap = css({
    display: "flex",
    mt: "2.4rem",
    gap: "1.2rem",
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
    boxShadow: "0px 1px 2px #f2f3f7",
    p: "0.2rem",

    display: "flex",
    flexDir: "column",
    flexShrink: "0",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.4rem",
    position: "relative",
});

const css_imageModify = css({
    w: "100%",
    h: "100%",
    objectFit: "contain",
});

const css_deleteButton = css({
    position: "absolute",
    top: "0.4rem",
    right: "0.4rem",
    opacity: "0.8",

    bg: "#fff",
    w: "2rem",
    h: "2rem",
    rounded: "0.4rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
