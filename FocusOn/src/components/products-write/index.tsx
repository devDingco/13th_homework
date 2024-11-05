"use client";

import FieldWrapper from "../commons/fieldWrapper";
import styles from "./styles.module.css";
import useProductsWirte from "./hook";
import { FormProvider } from "react-hook-form";
import { InputSoftMFull } from "@/commons/ui/input";
import { TextareaSoftMFull } from "@/commons/ui/textarea";
import { ButtonSoftMFitMain } from "@/commons/ui/button";
import { LinkCancel } from "@/commons/ui/link";
import ErrorMessage from "@/commons/ui/error";

export default function ProductsWrite(props) {
  const { methods, onClickSubmit, onChangeTag, addTag, tags, inputTag } =
    useProductsWirte(props);

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
              <TextareaSoftMFull
                name="contents"
                placeholder="내용을 입력해주세요."
              />
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
                  </span>
                ))}
              </div>
            </FieldWrapper>

            <hr />

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
