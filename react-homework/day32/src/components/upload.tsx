import Image from "next/image";
import styles from "./styles.module.css";

const UploadFile = () => {
  return (
    <label className={styles.btn_upload}>
      <Image
        src="/images/add image.png"
        alt="file-upload-button"
        width={160}
        height={160}
      />
      <input type="file" name="file" id="file" />
    </label>
  );
};
export default UploadFile;
