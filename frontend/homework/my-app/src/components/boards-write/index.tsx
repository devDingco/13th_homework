"use client";
import { useBoardsWrite } from "./hook";
import styles from "./style.module.css";
import Image from "next/image";
import { IBoardWriteprops } from "./type";
import { useState } from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

const BoardsWrite = (props: IBoardWriteprops) => {
  const {
    contentOnChange,
    signupButtonHandler,
    isAllFilled,
    handleComplete,
    zoneCode,
    setZoneCode,
    address,
    setAddress,
    onToggleModal,
    isModalOpen,
    addressDetail,
    setAddressDetail,
    youtubeOnChange,
    data,
    onChangeFile,
    onChangeInputs,
    fileRef,
    onClickImage,
    imageUrl,
    imgDeleted,
  } = useBoardsWrite(props);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {props.isEdit ? "게시글 수정" : "게시글 등록"}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.box}>
            <div className={styles.labelContainer}>
              <label>
                작성자 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
                id="writer"
                className={styles.input1}
                type="text"
                onChange={onChangeInputs}
                disabled={props.isEdit}
                defaultValue={data?.fetchBoard.writer ?? ""}
              />
              <div id="authorRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
            <div className={styles.labelContainer}>
              <label>
                비밀번호 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
                id="password"
                className={styles.input1}
                type="password"
                onChange={onChangeInputs}
                disabled={props.isEdit}
              />
              <div id="passwordRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                제목 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <input
                id="title"
                className={styles.input2}
                type="text"
                onChange={onChangeInputs}
                defaultValue={data?.fetchBoard.title ?? " "}
              />
              <div id="titleRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>
                내용 <span className={styles.emphasize}>*</span>{" "}
              </label>
              <textarea
                onChange={contentOnChange}
                defaultValue={data?.fetchBoard.contents ?? " "}
              />
              <div id="contentRedText" className={styles.errorText}>
                필수 입력 사항입니다
              </div>
            </div>
          </div>

          <div className={styles.columnBox}>
            <label>주소</label>
            <div className={styles.zipAndButtonContainer}>
              <input
                className={styles.zipNum}
                type="text"
                placeholder="01234"
                onChange={(e) => setZoneCode(e.target.value)}
                value={zoneCode}
              />

              <Button className={styles.searchZipNum} onClick={onToggleModal}>
                우편번호 검색
              </Button>
              {isModalOpen && (
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={onToggleModal}
                  onCancel={onToggleModal}
                >
                  <DaumPostcodeEmbed onComplete={handleComplete} />
                </Modal>
              )}
            </div>

            <input
              className={styles.input2}
              type="text"
              placeholder="주소를 입력해 주세요."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className={styles.input2}
              type="text"
              placeholder="상세주소"
              defaultValue={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>

          <div className={styles.box}>
            <div className={styles.labelContainer2}>
              <label>유튜브 링크</label>
              <input
                className={styles.input2}
                type="text"
                placeholder="링크를 입력해 주세요."
                onChange={youtubeOnChange}
                defaultValue={data?.fetchBoard.youtubeUrl ?? ""}
              />
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

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>취소</button>
            <button
              className={
                isAllFilled ? styles.submitButton_active : styles.submitButton
              }
              type="submit"
              onClick={signupButtonHandler}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardsWrite;
