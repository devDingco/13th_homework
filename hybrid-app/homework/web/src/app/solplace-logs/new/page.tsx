"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const Hello = () => {
  const [images, setImages] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const uploadedUrls: string[] = [];
  
    for (const file of files) {
      try {
        const result = await uploadFile({
          variables: { file },
        });
        if (result.data?.uploadFile.url) {
          uploadedUrls.push(result.data.uploadFile.url);
        }
      } catch (error) {
        console.error("파일 업로드 오류:", error);
      }
    }
  
    setImages((prev) => [...prev, ...uploadedUrls]);
  };
  

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image by index
  };

  const handleTextareaChange = (event) => {
    const text = event.target.value;
    setCharCount(text.length);
  };

  return (
    <div>

      <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.photoUpload}>
          <label htmlFor="file-upload" className={styles.photoBox}>
            <Image
              src="/images/add.png"
              width={24}
              height={24}
              alt="사진추가"
            />
            <span className={styles.photoText}>사진 등록</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={onChangeFile}
          />
        </div>

      
        {images.map((image, index) => (
          <div key={index} className={styles.thumbnail}>
            <Image
                src={`https://storage.googleapis.com/${image}`}
              alt={`Uploaded ${index}`}
              width={80}
              height={80}
            />
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveImage(index)}
            >
              X
            </button>
          </div>
        ))}
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="place-name" className={styles.label}>
              플레이스 이름 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="place-name"
              className={styles.input}
              placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="place-address" className={styles.label}>
              플레이스 주소
            </label>
            <button id="place-address" className={styles.addressButton}>
              플레이스 주소 입력
              <span className={styles.arrow}>
                <Image
                  src="/images/right_icon.png"
                  width={20}
                  height={20}
                  alt="주소입력버튼"
                />
              </span>
            </button>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="place-content" className={styles.label}>
              플레이스 내용 <span className={styles.required}>*</span>
            </label>
            <div className={styles.textareaWrapper}>
              <textarea
                id="place-content"
                className={styles.textarea}
                placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
                onChange={handleTextareaChange}
              ></textarea>
              <div className={styles.charCount}>{charCount}/100</div>
            </div>
          </div>

          <button className={styles.submitButton} disabled>
            로그 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hello;
