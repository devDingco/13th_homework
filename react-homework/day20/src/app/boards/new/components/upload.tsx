import Image from "next/image";
import styles from "../styles.module.css";

const UploadFile = () => {
  return (
    <label className={styles.btn_upload}>
      <Image
        src="/images/add.png"
        alt="file-upload-button"
        width={24}
        height={24}
      />
      <div>클릭해서 사진 업로드</div>
      <input type="file" name="file" id="file" />
    </label>
  );
};
export default UploadFile;
