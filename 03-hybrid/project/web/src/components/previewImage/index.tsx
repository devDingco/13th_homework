import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import IconClose from "../icon/icon-close";

interface IPreviewImageProps {
  src: string;
}

export default function PreviewImage({ src }: IPreviewImageProps) {
  return (
    <div className={styles.previewImage}>
      <button>
        <IconClose />
      </button>
      <Image
        src={`https://storage.googleapis.com/${src}`}
        alt="미리보기 이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
