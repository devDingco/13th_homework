// components/ImageUploadInput.tsx

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import defaultImage from "@/../public/assets/image.png";
import styles from "./ImageUploadInput.module.css"; // 스타일 파일

interface ImageUploadInputProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploadInput = ({
  imageUrls,
  setImageUrls,
  files,
  setFiles,
}: ImageUploadInputProps) => {
  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          console.log(fileReader.result, "파일리더 결과값입니다. ::::::::::");
          const newImageUrls = [...imageUrls];
          newImageUrls[index] = fileReader.result;
          setImageUrls(newImageUrls);

          const newFiles = [...files];
          newFiles[index] = file;
          setFiles(newFiles);
        }
      };
    };

  return (
    <div>
      <label>이미지</label>
      <div className={styles.imageContainer}>
        {[0, 1, 2].map((index) => (
          <div key={index} className={styles.imageBox}>
            <input
              type="file"
              accept="image/*"
              onChange={onChangeFile(index)}
              ref={fileRefs[index]}
              style={{ display: "none" }}
            />

            <div>
              <Image
                src={imageUrls[index] || defaultImage} // 인덱스별로 URL 또는 기본 이미지
                alt={`image preview ${index + 1}`}
                // fill
                width={80}
                height={80}
                objectFit="cover"
                onClick={() => fileRefs[index].current?.click()}
                className={styles.clickableImage}
                priority//우선로딩
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadInput;
