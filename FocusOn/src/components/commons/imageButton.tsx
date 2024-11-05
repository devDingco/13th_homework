import Image from "next/image";
import styles from "./styles.module.css";
import { useRef } from "react";
import { IImageButtonProps } from "../boards-write/types";

const ImageButton: React.FC<IImageButtonProps> = ({
  index,
  imageUrl,
  onClickDelete,
  onChangeFile,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  // file버튼 클릭해주기
  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <div className={styles.upload_button_group}>
      {/* 사진 업로드 안했으면 삭제버튼 안보이게 */}
      {imageUrl[index] && (
        <Image
          className={styles.delete_btn}
          src="/images/close_btn.png"
          width={16}
          height={16}
          alt="삭제버튼"
          id={index.toString()}
          onClick={onClickDelete}
        />
      )}

      <Image
        src={
          imageUrl[index]
            ? `https://storage.googleapis.com/${imageUrl[index]}`
            : "/images/add image.png"
        }
        id={index.toString()}
        alt="파일업로드버튼"
        width={160}
        height={160}
        onClick={onClickImage}
        className={styles.btn_upload}
      />
      <input
        type="file"
        id={index.toString()}
        style={{ display: "none" }}
        onChange={onChangeFile}
        ref={fileRef}
        accept="image/jpeg,image/png"
      />
    </div>
  );
};

export default ImageButton;
