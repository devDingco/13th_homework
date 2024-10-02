import Image from "next/image";
import styles from "./styles.module.css";

export default function ImageUploader() {
  return (
    <>
      <div className={styles.image_uploader_wrapper}>
        <Image src="/svgs/add.svg" alt="add" width={24} height={24} />
        <div className={styles.upload_prompt}>클릭해서 사진 업로드</div>
      </div>
    </>
  );
}
