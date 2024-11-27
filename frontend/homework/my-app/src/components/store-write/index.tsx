"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./style.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import useStoreWrite from "./hook";
import { StoreWritePageProps } from "./types";

export default function StoreWritePage(props: StoreWritePageProps) {
  const {
    handleSubmit,
    register,
    handleQuillChange,
    setAddressDetail,
    isModalOpen,
    onToggleModal,
    handleComplete,
    currentTag,
    setCurrentTag,
    addHashtag,
    removeHashtag,
    imgDeleted,
    onClickImage,
    onChangeFile,
    onSubmit,
    zipcode,
    address,
    data,
    hashtags,
    imageUrl,
    fileRef,
    errors,
    contents,
  } = useStoreWrite(props);

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2>상품 등록하기</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품명</label>
        <input className={styles.input} type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>한줄 요약</label>
        <input className={styles.input} type="text" {...register("remarks")} />
        {errors.remarks && (
          <p className={styles.error}>{errors.remarks.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>판매 가격</label>
        <input
          className={styles.input}
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품 설명</label>
        <ReactQuill
          onChange={handleQuillChange}
          className={styles.quill}
          placeholder="내용을 입력해 주세요."
          style={{ height: "300px", marginBottom: "20px" }}
          value={contents} // contents 상태로 연결
        />
        <p className={styles.error}>{errors.contents?.message}</p>
      </div>

      <div className={styles.addressSection}>
        <label className={styles.label}>주소</label>
        <div className={styles.zipcodeContainer}>
          <input
            type="text"
            value={zipcode}
            {...register("zipcode")}
            readOnly
            placeholder="우편번호"
            className={styles.zipcodeInput}
          />
          <button
            type="button"
            onClick={onToggleModal}
            className={styles.zipcodeButton}
          >
            우편번호 검색
          </button>
        </div>

        <input
          type="text"
          value={address}
          {...register("address")}
          readOnly
          placeholder="주소를 입력해 주세요"
          className={styles.addressInput}
        />

        <input
          type="text"
          {...register("addressDetail", {
            onChange: (e) => setAddressDetail(e.target.value), // react-hook-form과 상태 동기화
          })}
          placeholder="상세주소를 입력해 주세요"
          className={styles.addressDetailInput}
        />

        <div className={styles.mapPlaceholder}>
          <p>지도자리</p>
        </div>

        {/* 우편번호 검색 모달 */}
        {isModalOpen && (
          <Modal
            title="주소 검색"
            open={isModalOpen}
            onOk={onToggleModal}
            onCancel={onToggleModal}
            footer={null}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </Modal>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>해시태그</label>
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          placeholder="해시태그를 입력하세요"
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addHashtag();
            }
          }}
        />
        <button
          type="button"
          onClick={addHashtag}
          className={styles.addTagButton}
        >
          추가
        </button>
        <div className={styles.hashtags}>
          {hashtags.map((tag, index) => (
            <button
              key={index}
              onClick={() => removeHashtag(tag)}
              className={styles.tagButton}
            >
              #{tag} ✕
            </button>
          ))}
        </div>
      </div>

      <div className={styles.boxEnd}>
        <div className={styles.labelContainer2}>
          <label className={styles.label}>사진 첨부</label>
          <div className={styles.photoBoxContainer}>
            <div className={styles.flexbox2}>
              {imageUrl.map((url, index) => (
                <div
                  key={index}
                  className={styles.photoBox}
                  style={{
                    backgroundImage: `url(https://storage.googleapis.com/${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <button
                    className={styles.deleteButton}
                    onClick={() => imgDeleted(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* 추가 이미지 업로드 버튼 */}
              <div className={styles.photoBox} onClick={onClickImage}>
                <div className={styles.addImageIcon}>
                  <Image
                    src="/image/add.png"
                    alt="사진 추가"
                    width={30}
                    height={30}
                  />
                </div>
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  multiple // 여러 파일 선택 허용
                  onChange={onChangeFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
        <button type="button" className={styles.cancelButton}>
          취소
        </button>
      </div>
    </form>
  );
}
