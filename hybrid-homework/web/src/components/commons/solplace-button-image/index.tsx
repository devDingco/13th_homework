"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationFile } from "@/commons/utils/validation-file";

export default function SolplaceButtonImage() {
  // 미리보기 이미지
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // 전송할 이미지 파일
  const [images, setImages] = useState([]);
  const fileRef = useRef<HTMLInputElement>(null);
  // 파일 업로드 버튼 눌러주기
  const onClickImage = () => {
    fileRef.current?.click();
  };

  // 이미지 미리보기 삭제
  const onClickClose = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImagePreviews(updatedPreviews);
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  // 이미지 미리보기 추가 및 수정
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // file 없으면 리턴
    if (!file) return;
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log("image", event.target?.result);
      if (typeof event.target?.result === "string") {
        // 임시저장소에 원본 이미지배열 저장
        setImagePreviews([...imagePreviews, event.target.result]);
      }
    };
  };

  return (
    <div className={styles.images}>
      <div className={styles.buttonUpload}>
        {/* 이미지 등록 버튼 */}
        <Image
          className={styles.icon24}
          src="/assets/add.svg"
          width={0}
          height={0}
          alt="addIcon"
          onClick={onClickImage}
        />
        <div className={styles.buttonUploadTitle}>사진 등록</div>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={onChangeFile}
          ref={fileRef}
          accept="image/jpeg,image/png"
        />
      </div>
      {/* 이미지 미리보기 */}
      {imagePreviews?.map((preview, index) => (
        <div key={`${preview}_${index}`} className={styles.imageContainer}>
          <Image
            className={styles.image}
            width={0}
            height={0}
            sizes="100vw"
            src={preview}
            alt="imagePreview"
            onClick={onClickImage}
          />
          <div className={styles.close} onClick={() => onClickClose(index)}>
            <Image src="/assets/close.svg" width={16} height={16} alt="close" />
          </div>
        </div>
      ))}
    </div>
  );
}
