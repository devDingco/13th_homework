"use client";

import React, { ChangeEvent, MouseEvent, useRef } from "react";
import Divider from "@/app/_components/commons/divider";
import { InputForm, InputHeader } from "@/app/_components/commons/input";
import styles from "./styles.module.css";
import AddressInputForm from "@/commons/ui/form/AddressInputForm";
import ImageUploadForm from "@/app/_components/boards/Boards-write/components/image-upload-form";

export default function NewTravelProductPage() {
  const fileRefs = useRef<HTMLInputElement[]>([]);
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log(file);
  };

  const onClickImage = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event);
  };

  const onClickDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <div className={styles.newTravelProduct__container}>
      <h3 className={styles.header}>숙박권 판매하기</h3>
      <InputForm
        label="상품명"
        type="text"
        placeholder="상품명을 입력해 주세요."
        isRequired={true}
      ></InputForm>
      <Divider />
      <InputForm
        label="한 줄 요약"
        type="text"
        placeholder="상품을 한 줄로 요약해 주세요."
        isRequired={true}
      ></InputForm>
      <Divider />
      <InputForm
        label="판매 가격"
        type="text"
        placeholder="판매 가격을 입력해주세요. (원 단위)"
        isRequired={true}
      ></InputForm>
      <Divider />
      <div className={styles.product__info__container}>
        <InputHeader isRequired={true}>상품 설명</InputHeader>
        <textarea
          className={styles.product__info_textarea}
          placeholder="내용을 입력해 주세요."
        ></textarea>
      </div>
      <Divider />
      <div className={styles.location__container}>
        <div className={styles.address__container}>
          <AddressInputForm />
          <div className={styles.geoCoordinates__container}>
            <InputForm
              label="위도(LAT)"
              type="text"
              placeholder="주소를 먼저 입력해주세요."
            />
            <InputForm
              label="경도(LNG)"
              type="text"
              placeholder="주소를 먼저 입력해주세요."
            />
          </div>
        </div>
        <div className={styles.detail__location__container}>
          <span className={styles.detail__location__title}>상세 위치</span>
          <div className={styles.detail__location}>
            주소를 먼저 입력해 주세요.
          </div>
        </div>
      </div>
      <Divider />
      <InputForm
        label="태그 입력"
        type="text"
        placeholder="태그를 입력해 주세요."
      ></InputForm>
      <Divider />
      <div className={styles.image__upload__container}>
        <InputHeader>사진 첨부</InputHeader>
        <ImageUploadForm
          imageUrl={[]}
          fileRefs={fileRefs}
          onChangeFile={onChangeFile}
          onClickImage={onClickImage}
          onClickDeleteImage={onClickDeleteImage}
        ></ImageUploadForm>
      </div>
    </div>
  );
}
