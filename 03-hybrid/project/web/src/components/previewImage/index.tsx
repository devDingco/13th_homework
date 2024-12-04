import React, { MouseEvent } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Icon from "../icon";

interface IPreviewImageProps {
  src: string;
  onClickDelete: (
    event: MouseEvent<HTMLButtonElement>,
    deleteUrl: string
  ) => void;
}

export default function PreviewImage({
  src,
  onClickDelete,
}: IPreviewImageProps) {
  return (
    <div className={styles.previewImage}>
      <button onClick={(event) => onClickDelete(event, src)}>
        <Icon src="close.svg" width={0.875} height={0.875} />
      </button>
      <Image
        // src={`https://storage.googleapis.com/${src}`}
        src={src}
        alt="미리보기 이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
      />
    </div>
  );
}
