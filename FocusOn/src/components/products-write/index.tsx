"use client";

import "react-quill/dist/quill.snow.css";
import useProductsWirte from "./hook";
import styles from "./styles.module.css";
import KakaoMap from "./kakao-map";
import dynamic from "next/dynamic";
import DaumPostcodeEmbed from "react-daum-postcode";
import { FormProvider } from "react-hook-form";
import { Modal } from "antd";
import { X } from "lucide-react";
import { InputSoftMFull, InputSoftMS } from "@/commons/ui/input";
import { ButtonSoftMFitBorder, ButtonSoftMFitMain } from "@/commons/ui/button";
import { LinkCancel } from "@/commons/ui/link";
import FieldWrapper from "../commons/fieldWrapper";
import ErrorMessage from "@/commons/ui/error";

// ReactQuill을 dynamic으로 import
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // SSR 비활성화
});

export default function ProductsWrite(props) {
  const {
    isZipCodeModalOpen,
    lat,
    lng,
    tags,
    inputTag,
    methods,
    onToggleZipCodeModal,
    handleCompleteZipcodeModal,
    onChangeContents,
    onChangeTag,
    addTag,
    removeTag,
    onClickSubmit,
  } = useProductsWirte(props);
  // modal 토글 - zipcode

  return (
    <div className={styles.post_page_body}>
      <div className={styles.post_page}>
        <header className={styles.header}>서비스 등록하기</header>
        <FormProvider {...methods}>
          <form
            className={styles.post_main}
            onSubmit={methods.handleSubmit(onClickSubmit)}
          >
            {/* 상품명 입력 필드 */}
            <FieldWrapper label="상품명">
              <InputSoftMFull
                type="text"
                name="name"
                placeholder="상품명을 입력하세요."
              />
              <ErrorMessage name="name" />
            </FieldWrapper>

            <hr />

            {/* 한줄 요약 입력 필드 */}
            <FieldWrapper label="한줄 요약">
              <InputSoftMFull
                type="text"
                name="remarks"
                placeholder="상품을 한줄로 요약해 주세요."
              />
              <ErrorMessage name="remarks" />
            </FieldWrapper>

            <hr />

            {/* 상품 설명 입력 필드 */}
            <FieldWrapper label="상품 설명">
              <ReactQuill onChange={onChangeContents} />
              {/* <TextareaSoftMFull
                name="contents"
                placeholder="내용을 입력해주세요."
              /> */}
              <ErrorMessage name="contents" />
            </FieldWrapper>

            <hr />

            {/* 판매 가격 입력필드 */}
            <FieldWrapper label="판매 가격">
              <InputSoftMFull
                type="number"
                name="price"
                placeholder="판매 가격을 입력해 주세요. (원 단위)"
              />
              <ErrorMessage name="price" />
            </FieldWrapper>

            <hr />

            {/* 해시태그 입력 필드 */}
            <FieldWrapper label="해시태그 입력">
              <input
                className={styles.tag_input}
                type="text"
                value={inputTag}
                onChange={onChangeTag}
                onKeyDown={addTag}
                placeholder="해시태그를 입력해주세요. (Enter를 눌러 추가해 주세요.)"
              />
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                    <X
                      onClick={() => removeTag(index)}
                      className={styles.remove_tag}
                    />
                  </span>
                ))}
              </div>
            </FieldWrapper>

            <hr />

            <div className={styles.address}>
              {/* 주소 검색 필드 */}
              <div className={styles.address_input}>
                <FieldWrapper label="주소">
                  <div className={styles.zipcode_search}>
                    <InputSoftMS
                      type="text"
                      placeholder="01234"
                      name="zipcode"
                      readOnly={true}
                    />
                    <ButtonSoftMFitBorder
                      type="button"
                      onClick={onToggleZipCodeModal}
                    >
                      우편번호 검색
                    </ButtonSoftMFitBorder>
                  </div>
                  <InputSoftMFull
                    placeholder="상세주소를 입력해 주세요."
                    type="text"
                    name="addressDetail"
                  />
                </FieldWrapper>
                <FieldWrapper label="위도(LAT)">
                  <InputSoftMFull
                    type="text"
                    name="lat"
                    placeholder="주소를 먼저 입력해 주세요."
                    readOnly={true}
                    disabled={true}
                  />
                </FieldWrapper>
                <FieldWrapper label="경도(LNG)">
                  <InputSoftMFull
                    type="text"
                    name="lng"
                    placeholder="주소를 먼저 입력해 주세요."
                    readOnly={true}
                    disabled={true}
                  />
                </FieldWrapper>
              </div>
              {/* 상세위치 지도 */}
              <FieldWrapper label="상세위치">
                <KakaoMap lat={lat} lng={lng} />
              </FieldWrapper>

              {/* 우편번호 검색 모달 */}
              {isZipCodeModalOpen && (
                <Modal
                  open={true}
                  onCancel={onToggleZipCodeModal}
                  footer={null}
                >
                  <DaumPostcodeEmbed onComplete={handleCompleteZipcodeModal} />
                </Modal>
              )}
            </div>

            {/* TODO: 이미지 업로드 */}

            <div className={styles.btn_group}>
              <LinkCancel href="/products">취소</LinkCancel>
              <ButtonSoftMFitMain>
                {props.isEdit ? "수정" : "등록"}하기
              </ButtonSoftMFitMain>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
