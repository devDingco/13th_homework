"use client";

import React from "react";
import styles from "@/components/solplace-new/styles.module.css";
import { useSolNewPage } from "./hook";
import Image from "next/image";
import add from "/public/icon/add.png";
import deleteIcon from "/public/icon/delete.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function SolNewPage() {
  const {
    onChangeName,
    onChangeContents,
    onClickRegist,
    onClickAdress,
    postcodeComplete,
    onChangeFile,
    onClickRemovePrevImg,
    inputValue,
    imageUrl,
    isActive,
    isOpen,
  } = useSolNewPage();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <IoIosArrowBack className={styles.arrowIcon} />
        플레이스 등록
      </div>
      <div className={styles.container}>
        <div className={styles.inputsContainer}>
          <div className={styles.upload}>
            <div className={styles.group}>
              <div className={styles.photoGroup}>
                {imageUrl.map((url, index) => (
                  <div className={styles.photobox} key={index}>
                    {/* 삭제 아이콘 */}
                    <Image
                      src={deleteIcon}
                      alt="delete icon"
                      className={styles.deleteIcon}
                      onClick={() => onClickRemovePrevImg(index)}
                    />
                    {/* 업로드된 사진 미리보기 */}
                    <Image
                      src={url}
                      alt={`uploaded-${index}`}
                      width={100}
                      height={100}
                      className={styles.prevImage}
                    />
                  </div>
                ))}
                {/* 새로운 photobox (사진 추가 버튼) */}
                {imageUrl.length < 10 && (
                  <div className={styles.photobox}>
                    <label className={styles.photoIcon}>
                      <Image src={add} alt="plus icon" width={24} height={24} />
                      <p>사진 등록</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onChangeFile}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputs}>
            <span className={styles.title}>
              플레이스 이름<span className={styles.essential}>*</span>
            </span>
            <input
              type="text"
              placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
              className={styles.typeInputs}
              onChange={onChangeName}
            />
          </div>
          <div className={styles.inputs}>
            플레이스 주소
            <button className={styles.adressInput} onClick={onClickAdress}>
              플레이스 주소 입력
              <IoIosArrowForward className={styles.arrowIcon} />
            </button>
            {isOpen && (
              <Modal open={true} onOk={onClickAdress} onCancel={onClickAdress}>
                <DaumPostcodeEmbed onComplete={postcodeComplete} />
              </Modal>
            )}
          </div>
          <div className={styles.inputs}>
            <span className={styles.title}>
              플레이스 내용<span className={styles.essential}>*</span>
            </span>
            <div style={{ position: "relative", width: "100%" }}>
              <textarea
                value={inputValue}
                placeholder={
                  inputValue === ""
                    ? "플레이스 내용을 입력해 주세요. (1자 이상)"
                    : ""
                }
                className={styles.typeContents}
                onChange={onChangeContents}
              />
              <span className={styles.limitText}>{inputValue.length}/100</span>
            </div>

            {/* antd에서 input 0/100 형식인 거 봤던 기억이 있음 참고해서 수정 */}
          </div>
        </div>
        <button
          className={styles.registButton}
          onClick={onClickRegist}
          style={{
            backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7",
          }}
        >
          로그 등록
        </button>
      </div>
    </div>
  );
}
