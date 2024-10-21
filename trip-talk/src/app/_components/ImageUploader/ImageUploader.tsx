import Image from "next/image";
import styles from "./styles.module.css";
import useImageUploader from "../../../commons/hooks/useImageUploader";

export default function ImageUploader() {
  const { onClickImage, handleImageUpload, imageUrl, fileRef } =
    useImageUploader();
  return (
    <>
      <div className={styles.image_uploader_wrapper} onClick={onClickImage}>
        {!imageUrl && (
          <Image src="/svgs/add.svg" alt="add" width={24} height={24} />
        )}
        {imageUrl && (
          <img
            className={styles.upload_image}
            src={`https://storage.googleapis.com/${imageUrl}`}
          />
        )}
        {!imageUrl && (
          <div className={styles.upload_prompt}>클릭해서 사진 업로드</div>
        )}
      </div>
      <input
        className={styles.input}
        type="file"
        onChange={handleImageUpload}
        ref={fileRef}
      />
    </>
  );
}