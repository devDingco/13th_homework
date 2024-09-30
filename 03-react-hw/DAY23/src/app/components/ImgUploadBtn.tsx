import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import styles from "../boards/new/styles.module.css";

const ImgUploadBtn: React.FC = () => {
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    //?. : 옵셔널 체이닝 (files배열이 null일 수도 있으므로)
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.사진업로드상자}>
      {!previewSrc ? (
        <>
          <Image src="/images/icons/add.svg" width={40} height={40} alt="Add" />
          <span>클릭해서 사진 업로드</span>
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </>
      ) : (
        <Image
          src={previewSrc}
          alt="미리보기"
          className={styles.사진미리보기}
        />
      )}
    </div>
  );
};

export default ImgUploadBtn;
