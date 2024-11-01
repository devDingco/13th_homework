import styles from "./styles.module.css";
import { ChangeEvent, MouseEvent, MutableRefObject } from "react";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";

interface IImageUploadFormProps {
  imageUrl: string[];
  fileRefs: MutableRefObject<HTMLInputElement[]>;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onClickImage: (event: MouseEvent<HTMLDivElement>) => void;
  onClickDeleteImage: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ImageUploadForm = ({
  imageUrl,
  fileRefs,
  onChangeFile,
  onClickImage,
  onClickDeleteImage,
}: IImageUploadFormProps) => {
  return (
    <div className={styles.BoardsNew_inputForm}>
      {/* {CONSTANTS_TITLE.UPLOAD_PHOTO} */}
      <div className={styles.uploadButtonContainer}>
        {Array(3)
          .fill("")
          .map((_, index) => (
            <UploadButton
              key={index}
              id={index}
              onChange={onChangeFile}
              onClickImage={onClickImage}
              onClickDeleteImage={onClickDeleteImage}
              imageUrl={imageUrl}
              fileRefs={fileRefs}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageUploadForm;

interface IUploadButtonProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onClickImage: (event: MouseEvent<HTMLDivElement>) => void;
  onClickDeleteImage: (event: MouseEvent<HTMLButtonElement>) => void;
  id: number;
  imageUrl: string[];
  fileRefs: MutableRefObject<HTMLInputElement[]>;
}

const UploadButton = ({
  onChange,
  onClickImage,
  onClickDeleteImage,
  id,
  imageUrl,
  fileRefs,
}: IUploadButtonProps) => {
  return (
    <div
      id={String(id)}
      className={styles.uploadImageContainer}
      onClick={onClickImage}
    >
      <input
        id={String(id)}
        type="file"
        className={styles.uploadImageInput}
        onChange={onChange}
        ref={(el) => {
          fileRefs.current[id] = el as HTMLInputElement;
        }}
      />
      <div className={styles.uploadDescription}>
        <label htmlFor="uploadImage" id={styles.uploadLabel}>
          {imageUrl[id] ? (
            <div className={styles.imageContainer}>
              <button
                id={String(id)}
                className={styles.deleteButton}
                onClick={onClickDeleteImage}
              >
                <CloseOutlined className={styles.deleteImageIcon} />
              </button>
              <Image
                src={`https://storage.googleapis.com/${imageUrl[id]}`}
                alt="추가한 이미지"
                width={0}
                height={0}
                sizes="100vw"
                className={styles.uploadImage}
              ></Image>
            </div>
          ) : (
            <Image
              src="/assets/add.png"
              alt="추가하기 아이콘"
              width={24}
              height={24}
              sizes="100vw"
            ></Image>
          )}
          {imageUrl[id] ? "" : "클릭해서 사진 업로드"}
        </label>
      </div>
    </div>
  );
};

UploadButton.displayName = "UploadButton";
