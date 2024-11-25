"use client";

import React from "react";
import Divider from "@/app/_components/commons/divider";
import { InputForm, InputHeader } from "@/app/_components/commons/input";
import styles from "./styles.module.css";
import AddressInputForm from "@/commons/ui/form/AddressInputForm";
import ImageUploadForm from "@/app/_components/boards/Boards-write/components/image-upload-form";
import { FormProvider } from "react-hook-form";
import { ITravelProductSchema } from "@/app/_schema/travelProductSchema";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";
import useTravelProductWrite from "./hook";
import Header, { HeaderSize } from "@/commons/ui/header";
import KakaoMap from "@/commons/ui/kakao-map";

interface ITravelProductProps {
  isEdit?: boolean;
  id?: string;
}

export default function TravelProductWrite({
  isEdit = false,
  id = "",
}: ITravelProductProps) {
  const {
    methods,
    fileRefs,
    errorMessages,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
    onClickSubmit,
    onClickCancel,
    onClickUpdate,
    isAddressModalOpen,
    openModal,
    closeModal,
    handleZipcodeSelect,
  } = useTravelProductWrite({ isEdit, id });

  const images = methods.watch("images");
  const lat = methods.watch("lat");
  const lng = methods.watch("lng");
  const address = methods.watch("address");

  console.log("작성 페이지에서 감시하는 주소::", address);

  return (
    <FormProvider {...methods}>
      <div className={styles.newTravelProduct__container}>
        <Header title="숙박권 판매하기" size={HeaderSize.medium} />
        <InputForm<ITravelProductSchema>
          keyName="name"
          label="상품명"
          type="text"
          placeholder="상품명을 입력해 주세요."
          errorMessage={errorMessages.name?.message}
          validationStatus={errorMessages.name?.message ? "error" : "default"}
          isRequired={true}
        ></InputForm>
        <Divider />
        <InputForm<ITravelProductSchema>
          keyName="remarks"
          label="한 줄 요약"
          type="text"
          placeholder="상품을 한 줄로 요약해 주세요."
          errorMessage={errorMessages.remarks?.message}
          validationStatus={
            errorMessages.remarks?.message ? "error" : "default"
          }
          isRequired={true}
        ></InputForm>
        <Divider />
        <div className={styles.product__info__container}>
          <InputHeader isRequired={true}>상품 설명</InputHeader>
          <textarea
            {...methods.register("contents")}
            className={styles.product__info_textarea}
            placeholder="내용을 입력해 주세요."
          ></textarea>
        </div>
        <Divider />
        <InputForm<ITravelProductSchema>
          keyName="price"
          label="판매 가격"
          type="number"
          placeholder="판매 가격을 입력해주세요. (원 단위)"
          errorMessage={errorMessages.price?.message}
          validationStatus={errorMessages.price?.message ? "error" : "default"}
          isRequired={true}
        ></InputForm>
        <Divider />
        <InputForm<ITravelProductSchema>
          keyName="tags"
          label="태그 입력"
          type="text"
          placeholder="태그를 입력해 주세요."
        ></InputForm>
        <Divider />
        <div className={styles.location__container}>
          <div className={styles.address__container}>
            <AddressInputForm<ITravelProductSchema>
              isOpen={isAddressModalOpen}
              onClickSearchZipcode={openModal}
              handleOk={closeModal}
              handleCancel={closeModal}
              handleZipcodeSelect={handleZipcodeSelect}
              zipcodeKey="zipcode"
              addressKey="address"
              addressDetailKey="addressDetail"
            />
            <div className={styles.geoCoordinates__container}>
              <InputForm<ITravelProductSchema>
                keyName="lat"
                label="위도(LAT)"
                type="text"
                placeholder="주소를 먼저 입력해주세요."
                // disabled={true}
              />
              <InputForm<ITravelProductSchema>
                keyName="lng"
                label="경도(LNG)"
                type="text"
                placeholder="주소를 먼저 입력해주세요."
              />
            </div>
          </div>
          <div className={styles.detail__location__container}>
            <span className={styles.detail__location__title}>상세 위치</span>
            <div className={styles.detail__location}>
              {address ? (
                <KakaoMap
                  width="100%"
                  height="100%"
                  lat={Number(lat)}
                  lng={Number(lng)}
                />
              ) : (
                <p>주소를 먼저 입력해 주세요.</p>
              )}
            </div>
          </div>
        </div>
        <Divider />

        <div className={styles.image__upload__container}>
          <InputHeader>사진 첨부</InputHeader>
          <ImageUploadForm
            imageUrl={images}
            fileRefs={fileRefs}
            onChangeFile={onChangeFile}
            onClickImage={onClickImage}
            onClickDeleteImage={onClickDeleteImage}
          ></ImageUploadForm>
        </div>
        <div
          className={styles.buttons__Container}
          style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
        >
          <Button
            size={ButtonSize.large}
            variant={ButtonVariant.tertiary}
            label="취소"
            onClick={onClickCancel}
          ></Button>
          <Button
            size={ButtonSize.large}
            variant={ButtonVariant.primary}
            label={isEdit ? "수정하기" : "등록하기"}
            onClick={
              isEdit
                ? methods.handleSubmit(onClickUpdate)
                : methods.handleSubmit(onClickSubmit)
            }
          ></Button>
        </div>
      </div>
    </FormProvider>
  );
}
