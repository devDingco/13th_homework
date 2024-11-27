"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSoftMFull } from "@/commons/ui/button";
import { InputSoftMFull } from "@/commons/ui/input";
import { TextareaSoftMFull } from "@/commons/ui/textarea";
import { checkValidationFile } from "@/app/utils/validation-file";

export default function LogsNew() {
  // 미리보기 이미지
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // 전송할 이미지 파일
  const [images, setImages] = useState([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // 파일 업로드 버튼 눌러주기
  const onClickImage = () => {
    fileRef.current?.click();
  };

  // 이미지 미리보기 삭제
  const onClickClose = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImagePreviews(updatedPreviews);
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  // 이미지 미리보기 추가 및 수정
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // file 없으면 리턴
    if (!file) return;
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log("image", event.target?.result);
      if (typeof event.target?.result === "string") {
        // 임시저장소에 원본 이미지배열 저장
        setImagePreviews([...imagePreviews, event.target.result]);
      }
    };
  };

  const onClickSubmit = () => {};

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form
          className={styles.register}
          onSubmit={methods.handleSubmit(onClickSubmit)}
        >
          <div className={styles.main}>
            <div className={styles.images}>
              <div className={styles.buttonUpload}>
                {/* 이미지 등록 버튼 */}
                <Image
                  src="/asset/add.svg"
                  width={24}
                  height={24}
                  alt="addIcon"
                  onClick={onClickImage}
                />
                <div className={styles.buttonUploadTitle}>사진 등록</div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onChangeFile}
                  ref={fileRef}
                  accept="image/jpeg,image/png"
                />
              </div>
              {/* 이미지 미리보기 */}
              {imagePreviews?.map((preview, index) => (
                <div
                  key={`${preview}_${index}`}
                  className={styles.imageContainer}
                >
                  <Image
                    className={styles.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={preview}
                    alt="imagePreview"
                    onClick={onClickImage}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={onChangeFile}
                    ref={fileRef}
                    accept="image/jpeg,image/png"
                  />
                  <div
                    className={styles.close}
                    onClick={() => onClickClose(index)}
                  >
                    <Image
                      src="/asset/close.svg"
                      width={16}
                      height={16}
                      alt="close"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 플레이스 이름 */}
            <div className={styles.inputField}>
              <div className={styles.label}>
                플레이스 이름<span className={styles.required}> *</span>
              </div>

              <InputSoftMFull
                type="text"
                placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
                name="name"
              />
            </div>

            {/* 플레이스 주소 */}
            <div className={styles.inputField}>
              <div className={styles.label}>플레이스 주소</div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  className={styles.inputAddress}
                  placeholder="플레이스 주소 입력"
                  readOnly
                />
                <Image
                  src="/asset/right_arrow.svg"
                  className={styles.rightArrow}
                  width={24}
                  height={24}
                  alt="right_arrow"
                />
              </div>
            </div>

            {/* 플레이스 내용 */}
            <div className={styles.inputField}>
              <div className={styles.label}>
                플레이스 내용<span className={styles.required}> *</span>
              </div>
              <TextareaSoftMFull
                name="contents"
                placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
              />
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className={styles.button}>
            <ButtonSoftMFull>로그 등록</ButtonSoftMFull>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
