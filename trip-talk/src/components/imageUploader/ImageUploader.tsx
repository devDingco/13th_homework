import add from '../../assets/svgs/add.svg'
import styles from "./ImageUploader.module.css";

export default function ImageUploader() {
  return (
    <>
      <div className={styles.image_uploader_wrapper}>
        <img src={add} />
        <div className={styles.upload_prompt}>클릭해서 사진 업로드</div>
      </div>
    </>
  );
}
