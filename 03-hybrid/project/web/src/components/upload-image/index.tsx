import React, { ChangeEvent } from "react";
import styles from "./styles.module.css";
import IconAdd from "../icon/icon-add";

interface IUploadImageProps {
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function UploadImage({ onChangeFile }: IUploadImageProps) {
  return (
    <label className={styles.uploadImage}>
      <input type="file" onChange={onChangeFile} />
      <IconAdd />
      <p>사진 등록</p>
    </label>
  );
}
